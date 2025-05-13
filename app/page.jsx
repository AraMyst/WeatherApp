"use client";
import { useEffect, useState } from "react";
import ApiClient from "../ApiClient/client";

export default function Home() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherClient = new ApiClient();

  const handleFetchWeather = async () => {
    setLoading(true);
    setError(null);
    setForecast(null);

    try {
      const coords = await weatherClient.fetchCoordinates(city);
      const forecastData = await weatherClient.fetch7DayForecast(
        coords.latitude,
        coords.longitude
      );
      setForecast({ location: coords.name, ...forecastData });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Weather Forecast</h1>
        <p className="text-gray-600 mb-8">
          Enter a city name to get a 7-day weather forecast.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <input
            type="text"
            placeholder="Enter city..."
            className="px-4 py-2 border rounded w-full sm:w-1/2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={handleFetchWeather}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Get Forecast
          </button>
        </div>

        {loading && <p className="text-blue-500">Loading...</p>}

        {error && (
          <div className="text-red-600 mt-4 font-medium">
            Error: {error}
          </div>
        )}

        {forecast && (
          <div className="mt-8 text-left">
            <h2 className="text-2xl font-semibold mb-4">
              Weather Forecast for {forecast.location}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {forecast.daily.time.map((date, i) => (
                <div
                  key={date}
                  className="bg-white rounded shadow p-4 space-y-2"
                >
                  <p className="text-gray-800 font-bold">{date}</p>
                  <p>Max Temp: {forecast.daily.temperature_2m_max[i]}°C</p>
                  <p>Min Temp: {forecast.daily.temperature_2m_min[i]}°C</p>
                  <p>Wind: {forecast.daily.windspeed_10m_max[i]} km/h</p>
                  <p>Weather Code: {forecast.daily.weathercode[i]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}