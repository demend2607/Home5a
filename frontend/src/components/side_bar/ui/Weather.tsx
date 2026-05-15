import { useWeather } from "../../../entities/weather/model/useWeather";

import humidity from "../icons/humidity.svg";
import wind from "../icons/windy.svg";

import WeatherIcon from "./WeatherIcon";

export default function Weather() {
  const { weather, isLoading, error } = useWeather();
  console.log(isLoading);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && (
        <div className="weather flex flex-col gap-2 py-3">
          <div className="flex justify-evenly">
            <p className="numbers underline">{weather.temp_from_ha}°C</p>
            <p className="numbers">{weather.forecast_temp.temperature}°C</p>
          </div>

          <p className="numbers">Ощущается: {weather.forecast_temp.apparent_temperature}°C</p>
          <div className="text flex items-center flex-col">
            {weather.forecast_temp.description}
            <WeatherIcon iconKey={weather.forecast_temp.icon_key} isLoading={isLoading} />
          </div>

          <div className="numbers with_icon">
            <img src={wind} width="80" alt="" className="support_icon" /> {weather.forecast_temp.wind_speed} м/c
          </div>
          <div className="text with_icon">
            <img src={humidity} width="80" alt="" className="support_icon" />
            {weather.forecast_temp.humidity}
          </div>

          <p className="text">Давление: {Math.round(weather.forecast_temp.presure)}</p>
        </div>
      )}
    </>
  );
}
