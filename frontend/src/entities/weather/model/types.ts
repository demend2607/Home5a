export type yandexAttr = {
  temperature: number;
  wind_speed: number;
  feels_like: number;
  yandex_condition: string;
};
export type WeatherFromForecast = {
  state: string;
  description: string;
  attributes: yandexAttr;
};

export type WeatherResponse = { temp_from_ha: number; forecast_temp: WeatherFromForecast };
