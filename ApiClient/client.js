import axios from "axios";
const url = "https://geocoding-api.open-meteo.com/v1/search";
export class ApiClient {
  async fetchCoordinates(city) {
    
    const params = {
      name: city,
      count: 1
    };

    try {
      const response = await axios.get(url, { params });
      const data = response.data;

      if (!data.results || data.results.length === 0) {
        throw new Error("Location not found");
      }

      const { latitude, longitude, name } = data.results[0];
      return { latitude, longitude, name };
    } catch (error) {
      throw new Error(`Failed to fetch coordinates: ${error.message}`);
    }
  }

  async fetch7DayForecast(lat, lon) {
    const url = "https://api.open-meteo.com/v1/forecast";
    const params = {
      latitude: lat,
      longitude: lon,
      daily: "temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max",
      forecast_days: 7,
      timezone: "auto"
    };

    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch 7-day forecast: ${error.message}`);
    }
  }

 /* async fetchHourlyForecast(lat, lon, date) {
    const url = "https://api.open-meteo.com/v1/forecast";
    const params = {
      latitude: lat,
      longitude: lon,
      hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m",
      start_date: date,
      end_date: date,
      timezone: "auto"
    };

    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch hourly forecast: ${error.message}`);
    }
  }*/
}

export default ApiClient;