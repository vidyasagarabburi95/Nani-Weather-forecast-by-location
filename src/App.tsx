
// import React, { useState, useCallback } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   CssBaseline,
//   ThemeProvider,
//   createTheme,
// } from '@mui/material';
// import SearchBar from './components/SearchBar/SearchBar';
// import WeatherCard from './components/WeatherCard/WeatherCard';
// import WeatherDisplay from './components/weatherDisplay/WeatherDisplay';
// //import Forecast from './components/Forecast/Forescast';
// import Forecast from './components/Forecast/Forescast';
// import { useWeather } from './hooks/useWeather';
// import type { TemperatureUnit } from './types/weather.types';

// import './App.css'

// const theme=createTheme({
//   palette:{
//     primary:{
//       main:'#1976d2'
//     },
//     secondary:{
//       main:"#dc004e"
//     },
    
//   },
//   typography:{
//       fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     },
// })

// function App() {
//   const [snackBarOpen, setSnackbarOpen] = useState<boolean>(false);
//   const [snackBarMessage,setSnackbarMessage]=useState('')
//   const { city,
//         weather,
//         forecast,
//         unit,
//         loading,
//         error,
//         setCity,
//         fetchWeather,
//         handleUnitChange,
//         }=useWeather("London");
//   const handleSearch=useCallback(async(searchCity:string)=>{
//     try{
//       await fetchWeather(searchCity)
//     }catch(err){
//       setSnackbarMessage(err instanceof Error ? err.message : "search failed");
//       setSnackbarOpen(true)
//     }

//   },[fetchWeather]);

//   const handleLocationClick = useCallback(async()=>{
//     if(!navigator.geolocation){
//       setSnackbarMessage("Geo location is not supported by your browser");
//       setSnackbarOpen(true);
//       return
//     }
//     try {
//       const position =await new Promise<GeolocationPosition>((resolve,reject)=>{
//         navigator.geolocation.getCurrentPosition(resolve,reject,{
//           timeout:10000
//         })
//       })
//       const {latitude,longitude}=position.coords;
//       setSnackbarMessage('Location feature requires additional implementation');
//       setSnackbarOpen(true)
//     }catch(err){
//       setSnackbarMessage('Unable to retrieve your location');
//       setSnackbarOpen(true);
//       console.log(err)
//     }

//   },[])
//    const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Container maxWidth="lg" className="app-container">
//         <Box className="app-header">
//           <Typography variant="h3" component="h1" className="app-title">
//             Weather Dashboard
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             Real-time weather information
//           </Typography>
//         </Box>

//         <Box className="search-section">
//           <SearchBar
//             onSearch={handleSearch}
//             onUnitChange={handleUnitChange}
//             unit={unit}
//             loading={loading}
//             onLocationClick={handleLocationClick}
//           />
//         </Box>

//         <Box className="content-section">
//           {loading && (
//             <Box className="loading-container">
//               <CircularProgress />
//               <Typography variant="body1" className="loading-text">
//                 Loading weather data...
//               </Typography>
//             </Box>
//           )}

//           {error && (
//             <Alert severity="error" className="error-alert">
//               {error}
//             </Alert>
//           )}

//           {weather && (
//             <>
//               {/* <Box className="weather-card-container">
//                 <WeatherCard weather={weather} unit={unit} />
//               </Box> */}
//               <Box className="weather-display-container">
//       <WeatherDisplay weather={weather} unit={unit} />
//     </Box>

//               {forecast && (
//                 <Box className="forecast-container">
//                   <Forecast forecast={forecast} unit={unit} />
//                 </Box>
//               )}
//             </>
//           )}

//           {!loading && !weather && !error && (
//             <Alert severity="info">
//               Enter a city name to get weather information
//             </Alert>
//           )}
//         </Box>

//         <Snackbar
//           open={snackBarOpen}
//           autoHideDuration={6000}
//           onClose={handleSnackbarClose}
//           message={snackBarMessage}
//         />
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default App;
import React, { useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard';
import WeatherDisplay from './components/weatherDisplay/WeatherDisplay';
import Forecast from './components/Forecast/Forescast'; // keep your existing path
import { useWeather } from './hooks/useWeather';
import type { TemperatureUnit } from './types/weather.types';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [snackBarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackBarMessage, setSnackbarMessage] = useState('');

  const {
    city,
    weather,
    forecast,
    unit,
    loading,
    error,
    setCity,
    fetchWeather,
    handleUnitChange,
    fetchWeatherByCoords, // ✅ must exist in your hook
  } = useWeather('London');

  // ✅ Search
  const handleSearch = useCallback(
    async (searchCity: string) => {
      try {
        await fetchWeather(searchCity);
      } catch (err) {
        setSnackbarMessage(
          err instanceof Error ? err.message : 'Search failed'
        );
        setSnackbarOpen(true);
      }
    },
    [fetchWeather]
  );

  // ✅ FIXED GEOLOCATION (Now Actually Fetches Weather)
  const handleLocationClick = useCallback(async () => {
    if (!navigator.geolocation) {
      setSnackbarMessage(
        'Geolocation is not supported by your browser'
      );
      setSnackbarOpen(true);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
          });
        }
      );

      const { latitude, longitude } = position.coords;

      await fetchWeatherByCoords(latitude, longitude); // ✅ real implementation

      setSnackbarMessage('Location weather loaded successfully');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(
        err instanceof Error
          ? err.message
          : 'Unable to retrieve your location'
      );
      setSnackbarOpen(true);
      console.error(err);
    }
  }, [fetchWeatherByCoords]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className="app-container">
        <Box className="app-header">
          <Typography variant="h3" component="h1" className="app-title">
            Weather Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Real-time weather information
          </Typography>
        </Box>

        <Box className="search-section">
          <SearchBar
            onSearch={handleSearch}
            onUnitChange={handleUnitChange}
            unit={unit}
            loading={loading}
            onLocationClick={handleLocationClick}
          />
        </Box>

        <Box className="content-section">
          {loading && (
            <Box className="loading-container">
              <CircularProgress />
              <Typography variant="body1" className="loading-text">
                Loading weather data...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" className="error-alert">
              {error}
            </Alert>
          )}

          {weather && (
            <>
              <Box className="weather-display-container">
                <WeatherDisplay weather={weather} unit={unit} />
              </Box>

              {forecast && (
                <Box className="forecast-container">
                  <Forecast forecast={forecast} unit={unit} />
                </Box>
              )}
            </>
          )}

          {!loading && !weather && !error && (
            <Alert severity="info">
              Enter a city name to get weather information
            </Alert>
          )}
        </Box>

        <Snackbar
          open={snackBarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackBarMessage}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;


