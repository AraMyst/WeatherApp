import { mapCodeToDesc, mapCodeToCategory } from "@/utils/weatherCodes"; // adjust path as needed

export const WeatherCard = ({ date, currentTemp, maxTemp, minTemp, windSpeed, weatherCode }) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(date));

  const description = mapCodeToDesc(weatherCode);
  const category = mapCodeToCategory(weatherCode); // optional, use for styling/icon

  return (
    <div
      className="w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
      transform hover:scale-105 overflow-hidden p-6 border border-gray-100 flex flex-col space-y-2"
    >
      <h3 className="text-lg font-semibold text-gray-800">{formattedDate}</h3>
      <p className="text-sm text-gray-600">🌡️ Max Temp: {maxTemp}°C</p>
      <p className="text-sm text-gray-600">🌡️ Min Temp: {minTemp}°C</p>
      <p className="text-sm text-gray-600">💨 Wind: {windSpeed} km/h</p>
      <p className="text-sm text-gray-600">🌤️ {description}</p>
    </div>
  );
};