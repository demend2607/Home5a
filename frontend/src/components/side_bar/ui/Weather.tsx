import { useWeather } from "../../../entities/weather/model/useWeather";

import humidity from "../icons/humidity.svg";
import wind from "../icons/windy.svg";

import WeatherIcon from "./WeatherIcon";

export default function Weather() {
  const { weather, isLoading, error } = useWeather();
  const forecast = weather?.forecast_temp;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && (
        <div className="weather flex flex-col gap-2 py-3">
          <div className="flex justify-evenly">
            <p className="numbers underline">{weather.temp_from_ha ?? "—"}°C</p>
            <p className="numbers">{forecast?.attributes.temperature ?? "—"}°C</p>
          </div>

          {forecast ? (
            <>
              <p className="numbers">Ощущается: {forecast.attributes.feels_like}°C</p>
              <div className="text flex items-center flex-col">
                {forecast.description}
                <WeatherIcon iconKey={forecast.state} isLoading={isLoading} />
              </div>

              <div className="numbers with_icon">
                <img src={wind} width="80" alt="" className="support_icon" /> {forecast.attributes.wind_speed} м/c
              </div>
            </>
          ) : (
            <p className="text">Прогноз временно недоступен</p>
          )}
          {/* <div className="text with_icon">
            <img src={humidity} width="80" alt="" className="support_icon" />
            {weather.forecast_temp.humidity}
          </div> */}

          {/* <p className="text">Давление: {Math.round(weather.forecast_temp.presure)}</p> */}
        </div>
      )}
    </>
  );
}
