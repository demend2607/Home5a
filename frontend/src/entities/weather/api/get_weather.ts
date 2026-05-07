import { api } from "../../../shared/api/api-client";
import type { WeatherResponse } from "../model/types";

export async function getWeather() {
  return await api.get<WeatherResponse>("/weather");
}
