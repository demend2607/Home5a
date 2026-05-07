import { useEffect, useState } from "react";
import type { WeatherResponse } from "../model/types";
import { getWeather } from "../api/get_weather";

const TEN_MINUTES = 5 * 60 * 1000;

export function useWeather() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadWeather = async () => {
      try {
        const data = await getWeather();

        if (!isMounted) return;

        setWeather(data);
        setError(null);
      } catch (err) {
        if (!isMounted) return;

        setError(err instanceof Error ? err.message : "Weather request failed");
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    loadWeather();

    const intervalId = window.setInterval(() => {
      loadWeather();
    }, TEN_MINUTES);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return { weather, isLoading, error };
}
