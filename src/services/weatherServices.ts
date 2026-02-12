import axios from 'axios';
import type { WeatherData, ForecastData } from '../types/weather.types';

// ✅ Vite environment variables MUST start with VITE_
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// ✅ Validate environment variables
if (!BASE_URL) {
  throw new Error('VITE_OPENWEATHER_BASE_URL is not defined in .env');
}

if (!API_KEY) {
  throw new Error('VITE_OPENWEATHER_API_KEY is not defined in .env');
}

// ✅ Create axios instance
const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
  },
  timeout: 10000,
});

export const weatherService = {
  // ✅ Get current weather by city name
  async getCurrentWeather(
    city: string,
    units: 'metric' | 'imperial' = 'metric'
  ): Promise<WeatherData> {
    try {
      const response = await weatherApi.get<WeatherData>('/weather', {
        params: {
          q: city,
          units,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch weather data';
        throw new Error(message);
      }
      throw new Error('Unexpected error occurred');
    }
  },

  // ✅ Get 5-day forecast
  async getForecast(
    city: string,
    units: 'metric' | 'imperial' = 'metric'
  ): Promise<ForecastData> {
    try {
      const response = await weatherApi.get<ForecastData>('/forecast', {
        params: {
          q: city,
          units,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch forecast data';
        throw new Error(message);
      }
      throw new Error('Unexpected error occurred');
    }
  },

  // ✅ Get weather using latitude & longitude
  async getWeatherByCoord(
    lat: number,
    lon: number,
    units: 'metric' | 'imperial' = 'metric'
  ): Promise<WeatherData> {
    try {
      const response = await weatherApi.get<WeatherData>('/weather', {
        params: {
          lat,
          lon,
          units,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch weather by location';
        throw new Error(message);
      }
      throw new Error('Unexpected error occurred');
    }
  },
};
