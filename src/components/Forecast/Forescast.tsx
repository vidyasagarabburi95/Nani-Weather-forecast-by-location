// src/components/Forecast/Forecast.tsx

import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import type { ForecastData, TemperatureUnit } from "../../types/weather.types";
import { formatTemperature } from "../../utils/weatherUtils";

interface Props {
  forecast: ForecastData;
  unit: TemperatureUnit;
}

const Forecast: React.FC<Props> = ({ forecast, unit }) => {
  const dailyData = forecast.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <Grid container spacing={2} mt={2}>
      {dailyData.slice(0, 5).map((day) => (
        <Grid item xs={6} md={2} key={day.dt}>
          <Card>
            <CardContent>
              <Typography>
                {new Date(day.dt * 1000).toLocaleDateString()}
              </Typography>

              <Typography variant="h6">
                {formatTemperature(day.main.temp, unit)}
              </Typography>

              <Typography>
                {day.weather[0].main}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Forecast;
