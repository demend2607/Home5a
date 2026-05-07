export type WeatherFromForecast = {
  description: string;
  icon_key: string;
  temperature: number;
  apparent_temperature: number;
  humidity: number;
  wind_speed: number;
  presure: number;
};

export type WeatherResponse = { temp_from_ha: number; forecast_temp: WeatherFromForecast };
