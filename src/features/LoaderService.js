class LoaderService {
    constructor() {
        if (LoaderService.instance) {
            return LoaderService.instance;
        }
        this.loadingState = {};
        LoaderService.instance = this;
    }

    /**
     * Generates a unique key by combining an API request type and its payload.
     * @param key - The type of API request.
     * @param payload - The data associated with the API request.
     * @returns A string that uniquely identifies the API request with its payload.
     */
    getKeyWithPayload(key, payload) {
        return key + JSON.stringify(payload);
    }

    /**
     * Sets the loading state for a given API request key.
     * @param key - Unique identifier for the API request.
     * @param isLoading - Boolean indicating whether the request is loading.
     */
    setLoading(key, isLoading) {
        this.loadingState[key] = isLoading;
    }

    /**
     * Checks if a specific API request is currently loading.
     * @param key - Unique identifier for the API request.
     * @returns Boolean indicating if the request is loading.
     */
    isLoading(key) {
        return !!this.loadingState[key];
    }

    /**
     * Removes the loading state for a given API request key,
     * indicating that the request has completed.
     * @param key - Unique identifier for the API request.
     */
    finishLoading(key) {
        delete this.loadingState[key];
    }
}

// Export the singleton instance
const loaderServiceInstance = new LoaderService();
export default loaderServiceInstance;
