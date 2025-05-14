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
    <main className="min-h-screen bg-blue-950">
      
     <header className="bg-white shadow-lg p-8 mb-8 text-black">
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
    <div className="text-4xl font-bold">WeatherApp</div>

    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
      <input
        type="text"
        placeholder="Enter a city name to get a 7-day weather forecast"
        className="bg-gray-100 px-4 py-2 border rounded w-[600px] sm:w-[450px]"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={handleFetchWeather}
        className="text-sm bg-blue-950 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
      >
        Go!
      </button>
    </div>
  </div>
</header>

    


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
              className="text-sm bg-blue-950 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full mt-4"
              onClick={() => setSelectedForecast(null)}
            >Close
            </button>
          </div>
        )}

        {forecast && (
          <div className="mt-8 text-left">
            <h2 className="text-2xl font-semibold mb-4 text-white pl-8 pb-4">
              7 Day Weather Forecast for {forecast.location}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 pl-8 pr-8">
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
    </main>
  );
}