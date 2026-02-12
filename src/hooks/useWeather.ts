// src/hooks/useWeather.ts

import { useState, useEffect, useCallback } from "react";
import type {
  WeatherData,
  ForecastData,
  TemperatureUnit,
} from "../types/weather.types";
import { weatherService } from "../services/weatherServices";

export const useWeather = (defaultCity = "London") => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(
    async (city: string) => {
      if (!city.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const [weatherData, forecastData] = await Promise.all([
          weatherService.getCurrentWeather(city, unit),
          weatherService.getForecast(city, unit),
        ]);

        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch weather");
        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    },
    [unit]
  );

  const fetchByLocation = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const data = await weatherService.getWeatherByCoord(lat, lon, unit);
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(defaultCity);
  }, [fetchWeather, defaultCity]);

  return {
    weather,
    forecast,
    unit,
    loading,
    error,
    fetchWeather,
    fetchByLocation,
    setUnit,
  };
};
