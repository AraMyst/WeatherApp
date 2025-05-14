import { mapCodeToDesc, mapCodeToCategory } from "@/utils/weatherCodes";

const bgImageMap = {
  sunny: "/images/sunny.avif",
  cloudy: "/images/cloudy.avif",
  rain: "/images/rain.avif",
  storm: "/images/storm.avif",
  snow: "/images/snow.avif",
};

export const WeatherCard = ({ date, weatherCode, onClick }) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(date));

  const description = mapCodeToDesc(weatherCode);
  const category = mapCodeToCategory(weatherCode);
  const bgImage = bgImageMap[category] || "";

  return (
    <div
      onClick={onClick}
      className="relative w-full bg-cover bg-center rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden p-6 border border-gray-100 flex flex-col space-y-2"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-40 rounded-xl z-0" />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-gray-800">{formattedDate}</h3>
        <p className="text-sm text-gray-600">🌤️ {description}</p>
      </div>
    </div>
  );
};