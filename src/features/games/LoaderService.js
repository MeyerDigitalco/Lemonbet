// Enum-like object representing different API request types
export const ApiRequest = {
    GetGames: "GetGames",
    ShowTopWins: "ShowTopWins",
  };
  
  // LoaderService class (Singleton)
  class LoaderService {
    // Singleton instance
    static instance = null;
  
    // Keeps track of loading states for various API requests
    loadingState = {};
  
    // Private-like constructor pattern (not enforced in JS)
    constructor() {
      if (LoaderService.instance) {
        return LoaderService.instance;
      }
      LoaderService.instance = this;
    }
  
    /**
     * Sets the loading state for a given API request key.
     * @param {string} key - Unique identifier for the API request.
     * @param {boolean} isLoading - Whether the request is loading.
     */
    setLoading(key, isLoading) {
      this.loadingState[key] = isLoading;
    }
  
    /**
     * Checks if a specific API request is currently loading.
     * @param {string} key - Unique identifier for the API request.
     * @returns {boolean} True if loading, otherwise false.
     */
    isLoading(key) {
      return !!this.loadingState[key];
    }
  
    /**
     * Removes the loading state for a given API request key.
     * @param {string} key - Unique identifier for the API request.
     */
    finishLoading(key) {
      delete this.loadingState[key];
    }
  
    /**
     * Returns the singleton instance.
     * If it doesn't exist, creates one.
     */
    static getInstance() {
      if (!LoaderService.instance) {
        LoaderService.instance = new LoaderService();
      }
      return LoaderService.instance;
    }
  }
  
  // Export the singleton instance
  export default LoaderService.getInstance();
  