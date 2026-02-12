import React from 'react';
import {Card,CardContent,Typography,Box,Chip,Grid} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { WeatherData,TemperatureUnit } from '../../types/weather.types';
import { formatTemperature,formatWindSpeed,getCardinalDirection,getWeatherDescription,formatTime } from '../../utils/weatherutils';


interface WeatherCardProps{
    weather:WeatherData,
    unit:TemperatureUnit
}

const WeatherCard:React.FC<WeatherCardProps>  = ({weather,unit}) =>{
    const weatherIconUrl=`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    return (
    <Card className="weather-card">
      <CardContent>
        <Box className="weather-header">
          <Box>
            <Typography variant="h4" className="city-name">
              {weather.name}, {weather.sys.country}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {new Date(weather.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          </Box>
          <Chip
            label={getWeatherDescription(weather.weather[0].description)}
            color="primary"
            className="weather-condition"
          />
        </Box>

        <Box className="weather-main">
          <Box className="temperature-section">
            <img
              src={weatherIconUrl}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
            <Typography variant="h2" className="temperature">
              {formatTemperature(weather.main.temp, unit)}
            </Typography>
            <Box className="temperature-range">
              <Typography variant="body2" color="text.secondary">
                H: {formatTemperature(weather.main.temp_max, unit)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                L: {formatTemperature(weather.main.temp_min, unit)}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" className="feels-like">
            Feels like {formatTemperature(weather.main.feels_like, unit)}
          </Typography>
        </Box>

        <Grid container spacing={2} className="weather-details">
          <Grid item xs={6} sm={4} md={2}>
            <Box className="detail-item">
              <WaterIcon className="detail-icon" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Humidity
                </Typography>
                <Typography variant="body2">
                  {weather.main.humidity}%
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Box className="detail-item">
              <AirIcon className="detail-icon" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Wind
                </Typography>
                <Typography variant="body2">
                  {formatWindSpeed(weather.wind.speed, unit)} {getCardinalDirection(weather.wind.deg)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Box className="detail-item">
              <CompressIcon className="detail-icon" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Pressure
                </Typography>
                <Typography variant="body2">
                  {weather.main.pressure} hPa
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Box className="detail-item">
              <VisibilityIcon className="detail-icon" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Visibility
                </Typography>
                <Typography variant="body2">
                  {(weather.visibility / 1000).toFixed(1)} km
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Box className="detail-item">
              <WbSunnyIcon className="detail-icon" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Sunrise
                </Typography>
                <Typography variant="body2">
                  {formatTime(weather.sys.sunrise)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Box className="detail-item">
              <WbSunnyIcon className="detail-icon" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Sunset
                </Typography>
                <Typography variant="body2">
                  {formatTime(weather.sys.sunset)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;