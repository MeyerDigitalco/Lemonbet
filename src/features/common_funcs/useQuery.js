import { useLocation, useNavigate } from "react-router-dom";

export const useQuery = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentPath = location.pathname;

    const updateQueryParameter = (paramName, value) => {
        if (value === null) {
            searchParams.delete(paramName);
        } else {
            searchParams.set(paramName, value);
        }

        navigate({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
    };

    const batchUpdateQueryParameters = (params) => {
        params.forEach(param => {
            if (param.value === null) {
                searchParams.delete(param.paramName);
            } else {
                searchParams.set(param.paramName, param.value);
            }
        });

        navigate({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
    };

    return {
        updateQueryParameter,
        batchUpdateQueryParameters,
        currentPath
    };
};
