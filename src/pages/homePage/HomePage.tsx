import React, { useEffect } from "react";
import Search from "../../components/search/Search";
import CityDetailedWeatherCard from "../../components/cityDetailedWeatherCard/CityDetailedWeatherCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setWeather,
  setForecast,
  setCurrentConditions,
  setCurrentCityUserLookingFor,
} from "../../store/slices/weatherSlice";
import { get5DayForecast, getCurrentConditions } from "../../api/api";
import { RootState } from "../../store/store";

function HomePage() {
  const dispatch = useDispatch();
  const { currentCityUserLookingFor } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("currentCityUserLookingFor", currentCityUserLookingFor);
        if (!currentCityUserLookingFor.id) {
          const defaultCityKey = "215854";

          const currentConditionsData = await getCurrentConditions(
            defaultCityKey
          );
          dispatch(
            setCurrentConditions({
              cityKey: defaultCityKey,
              temperature: currentConditionsData[0].Temperature.Imperial.Value,
              weatherText: currentConditionsData[0].WeatherText,
            })
          );

          const defaultCityData = await get5DayForecast(defaultCityKey);
          dispatch(
            setForecast({ cityKey: defaultCityKey, ...defaultCityData })
          );
          dispatch(
            setWeather({
              cityName: currentConditionsData[0].LocalizedName,
              currentTemperature: 0,
            })
          );

          dispatch(
            setCurrentCityUserLookingFor({
              id: defaultCityKey,
              name: "Tel Aviv",
            })
          );
        } else {
          const currentConditionsData = await getCurrentConditions(
            currentCityUserLookingFor.id
          );
          dispatch(
            setCurrentConditions({
              cityKey: currentCityUserLookingFor.id,
              temperature: currentConditionsData[0].Temperature.Imperial.Value,
              weatherText: currentConditionsData[0].WeatherText,
            })
          );

          dispatch(
            setWeather({
              cityName: currentConditionsData[0].LocalizedName,
              currentTemperature: 0,
            })
          );

          const forecastData = await get5DayForecast(
            currentCityUserLookingFor.id
          );
          dispatch(setForecast(forecastData));
        }
      } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
      }
    };

    fetchData();
  }, [currentCityUserLookingFor, dispatch]);

  return (
    <div>
      <Search />
      <CityDetailedWeatherCard />
    </div>
  );
}

export default HomePage;
