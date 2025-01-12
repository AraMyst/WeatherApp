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
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Get multiple users (default 10)
  async getUsers() {
    return this.getRequest("", { results: 10 });
  }

  // Get users by nationality
  async getUsersByNationality(nat) {
    return this.getRequest("", { nat, results: 10 });
  }

  // Get users by gender
  async getUsersByGender(gender) {
    return this.getRequest("", { gender, results: 10 });
  }

  // Get users by filters
  async getUsersByFilters({ nationality, gender }) {
    const params = { results: 10 };
    if (nationality) params.nat = nationality;
    if (gender) params.gender = gender;
    return this.getRequest("", params);
  }
}

export default ApiClient;