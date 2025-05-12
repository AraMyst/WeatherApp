import axios from "axios";

// Base URL for the Random User API
const BASE_URL = "https://randomuser.me/api";

export class ApiClient {
  // Helper method to check if the API response is successful
  async responseStatusCheck(responseObject) {
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return responseObject;
    }
    throw new Error(responseObject.statusText);
  }

  // Generic GET request method
  async getRequest(endpoint, params = {}) {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
      return this.responseStatusCheck(response);
    } catch (error) {
      //  error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(`API Error: ${error.response.status} - ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from the server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  // Get users with optional filters
  async getUsersByFilters({ nationality } = {}) {
    const params = { results: 10 };
    if (nationality) params.nat = nationality;
    return this.getRequest("", params);
  }
}

export default ApiClient;