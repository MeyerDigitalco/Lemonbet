import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import LoaderService from "./LoaderService";
import Config from "../utils/config";
import { clearToken, clearUser } from "./user/userSlice";
import { addError } from "./api-error-v2/errorV2Slice";

/**
 * Make request to API
 * Version 2.0.0
 * @param method HTTP method
 * @param url URL of request
 * @param token Token for auth
 * @param dispatch Function for dispatching actions
 * @param data Data for request
 * @param onLoaderChange Function for change loader state
 * @param apiErrorDisplayMode Way of displaying errors ("toast" | "modal")
 * @param errorMode Way of handling errors ("silent" | "alert")
 * @returns Promise with response data
 */
const makeApiRequest = (
    method,
    url,
    token,
    dispatch,
    data,
    onLoaderChange,
    apiErrorDisplayMode,
    errorMode = "alert"
) => {
    const requestKey = `${method.toUpperCase()} ${url}`;

    return new Promise((resolve, reject) => {
        if (LoaderService.isLoading(requestKey)) {
            return;
        }

        LoaderService.setLoading(requestKey, true);
        if (onLoaderChange) onLoaderChange(true);

        // Choose config depending on whether it's FormData
        const isFormData = data instanceof FormData;
        const baseConfig = isFormData ? Config.axiosConfig : Config.axiosRESTConfig;

        const axiosInstance = axios.create({
            ...baseConfig,
            headers: {
                ...baseConfig.headers,
                ...(token ? { "x-token": token } : {}),
            },
        });

        axiosInstance({
            method,
            url,
            data,
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                let apiError;

                if (error.response) {
                    const { status, data } = error.response;
                    if (status === 401) {
                        dispatch(clearUser());
                        dispatch(clearToken());
                        window.location.reload();
                        return;
                    } else if (data.error) {
                        apiError = {
                            displayMethod: apiErrorDisplayMode || "modal",
                            uuid: uuidv4(),
                            ...data.error
                        };
                    } else {
                        apiError = {
                            displayMethod: apiErrorDisplayMode || "toast",
                            uuid: uuidv4(),
                            code: status,
                            message: 'Unknown error',
                        };
                    }

                    console.error(`API Error [${requestKey}]`, { status, data, fullError: error.response });
                } else {
                    apiError = {
                        code: error.code,
                        displayMethod: "toast",
                        uuid: uuidv4(),
                        message: "Network error",
                    };
                    console.error(`Network Error [${requestKey}]`, { error });
                }

                if (errorMode === "alert") {
                    dispatch(addError(apiError));
                }
                reject(apiError);
            })
            .finally(() => {
                LoaderService.finishLoading(requestKey);
                if (onLoaderChange) onLoaderChange(false);
            });
    });
};

export default makeApiRequest;
