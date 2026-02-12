// src/components/WeatherDisplay/WeatherDisplay.tsx

import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import type { WeatherData, TemperatureUnit } from "../../types/weather.types";
import { formatTemperature } from "../../utils/weatherUtils";

interface Props {
  weather: WeatherData;
  unit: TemperatureUnit;
}

const WeatherDisplay: React.FC<Props> = ({ weather, unit }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">
          {weather.name}, {weather.sys.country}
        </Typography>

        <Typography variant="h2">
          {formatTemperature(weather.main.temp, unit)}
        </Typography>

        <Typography>
          {weather.weather[0].description}
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={6}>
            Humidity: {weather.main.humidity}%
          </Grid>
          <Grid item xs={6}>
            Wind: {weather.wind.speed}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
