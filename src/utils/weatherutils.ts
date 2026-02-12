import type { TemperatureUnit } from "../types/weather.types";

export const formatTemperature = (temp:number,unit:TemperatureUnit):string=> {
    return `${Math.round(temp)}° ${unit==='metric' ? "C" :"F"}`

}

export const formatWindSpeed = (speed : number,unit:TemperatureUnit):string => {
    return `${speed.toFixed(1)} ${unit === "metric" ? "m/s" :"mph"}`

}

export const formatDate  = (timestamp: number):string=> {
    return new Date(timestamp *1000).toLocaleDateString('en-us',{
         weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    })

}

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getCardinalDirection = (angle: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(angle / 45) % 8];
};

export const getWeatherDescription = (description: string): string => {
  return description.charAt(0).toUpperCase() + description.slice(1);
};