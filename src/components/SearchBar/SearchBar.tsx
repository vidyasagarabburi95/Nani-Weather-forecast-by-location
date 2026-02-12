// src/components/SearchBar/SearchBar.tsx

import React, { useState } from "react";
import {
  TextField,
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import type { TemperatureUnit } from "../../types/weather.types";

interface Props {
  onSearch: (city: string) => void;
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
  onLocationClick: () => void;
}

const SearchBar: React.FC<Props> = ({
  onSearch,
  unit,
  onUnitChange,
  onLocationClick,
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2}>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search city..."
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />

      <IconButton onClick={onLocationClick}>
        <MyLocationIcon />
      </IconButton>

      <ToggleButtonGroup
        value={unit}
        exclusive
        onChange={(_, newUnit) => {
          if (newUnit !== null) {
            onUnitChange(newUnit);
          }
        }}
      >
        <ToggleButton value="metric">°C</ToggleButton>
        <ToggleButton value="imperial">°F</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default SearchBar;
