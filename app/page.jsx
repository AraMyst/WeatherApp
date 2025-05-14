"use client";
import { useEffect, useState } from "react";
import ApiClient from "../ApiClient/client";
import { WeatherCard } from "@/components/WeatherCard";
import { mapCodeToDesc } from "@/utils/weatherCodes";

export default function Home() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedForecast, setSelectedForecast] = useState(null);

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
    <main className="min-h-screen  bg-blue-950 py-12 px-4">
      <div className="mx-auto text-center">
        <h1 className="text-white text-4xl font-bold mb-6">Weather Forecast</h1>
        <p className="text-white mb-8">
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
            className="bg-white text-black px-6 py-2 rounded hover:bg-blue-100 transition"
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

{selectedForecast && (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Details for{" "}
              {new Intl.DateTimeFormat("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              }).format(new Date(selectedForecast.date))}
            </h2>
            <p><strong>Max Temp:</strong> {selectedForecast.maxTemp}°C</p>
            <p><strong>Min Temp:</strong> {selectedForecast.minTemp}°C</p>
            <p><strong>Wind Speed:</strong> {selectedForecast.windSpeed} km/h</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
              onClick={() => setSelectedForecast(null)}
            >
              Close
            </button>
          </div>
        )}

        {forecast && (
          <div className="mt-8 text-left">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Weather Forecast for {forecast.location}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
              {forecast.daily.time.map((date, i) => (
                <WeatherCard
                  key={date}
                  date={date}
                  weatherCode={forecast.daily.weathercode[i]}
                  onClick={() =>
                    setSelectedForecast({
                      date,
                      maxTemp: forecast.daily.temperature_2m_max[i],
                      minTemp: forecast.daily.temperature_2m_min[i],
                      windSpeed: forecast.daily.windspeed_10m_max[i],
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}

        
      </div>
    </main>
  );
}