import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/slices/weatherSlice";
import { RootState } from "../../store/store";
import CityDailyWeatherCard from "../cityDailyWeatherCard/CityDailyWeatherCard";

const CityDetailedWeatherCard: React.FC = () => {
  const { currentCityUserLookingFor, currentConditions, forecast, favorites ,temperatureUnit} = useSelector(
    (state: RootState) => state.weather
  );
  const dispatch = useDispatch();
  
  if (currentConditions?.temperature=== undefined) {
    return null;
  }
  function toCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) * 5) / 9;
  }

  const convertedTemperature = temperatureUnit === 'C' ? `${toCelsius(currentConditions?.temperature).toFixed(1)}` : `${currentConditions?.temperature.toFixed(1)}`  

  const isFavorite = favorites.some(
    (city) => city.id === currentCityUserLookingFor.id
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(currentCityUserLookingFor.id));
    } else {
      const newFavorite = {
        id: currentCityUserLookingFor.id,
        name: currentCityUserLookingFor.name,
      };
      dispatch(addToFavorites(newFavorite));
    }
  };

  return (
    <Card style={{ width: "80%", margin: "auto", position: "relative" }}>
      <Button
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: isFavorite ? "red" : "initial",
        }}
        onClick={handleToggleFavorite}
      >
        Favorite
      </Button>

      <CardContent>
        <Typography
          variant="h4"
          component="div"
          style={{ marginBottom: "36px" }}
        >
          {currentCityUserLookingFor.name}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          style={{ marginBottom: "36px" }}
        >
          Current Temperature: {convertedTemperature} {temperatureUnit}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          style={{ marginBottom: "36px" }}
        >
          Weather Conditions: {currentConditions?.weatherText || "N/A"}
        </Typography>
      </CardContent>

      <Grid container spacing={2} justifyContent="space-between">
        {forecast.DailyForecasts.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
         
            <CityDailyWeatherCard date={data.Date} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default CityDetailedWeatherCard;
