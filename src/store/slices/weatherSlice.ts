import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DailyForecast {
  Date: string;
  Temperature: {
    Maximum: {
      Value: number;
    };
    Minimum: {
      Value: number;
    };
  };
}

interface CurrentConditions {
  cityKey: string;
  temperature: number;
  weatherText: string;
}

interface Favorite {
  id: string; 
  name: string; 
}

interface currentCityUserLookingFor {
  id: string; 
  name: string; 
}

interface WeatherState {
  cityName: string;
  currentTemperature: number;
  forecast: {
    Headline: {
      Text: string;
    };
    DailyForecasts: DailyForecast[];
  };
  currentConditions: CurrentConditions | null;
  currentCityUserLookingFor: currentCityUserLookingFor;
  favorites: Favorite[]; 
  temperatureUnit: 'C' | 'F';
}

const initialState: WeatherState = {
  cityName: '',
  currentTemperature: 0,
  forecast: {
    Headline: {
      Text: '',
    },
    DailyForecasts: [],
  },
  currentConditions: null,
  currentCityUserLookingFor: { id: '', name: '' },
  favorites: [],
  temperatureUnit: 'F'
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<{ cityName: string; currentTemperature: number }>) => {
      state.cityName = action.payload.cityName;
      state.currentTemperature = action.payload.currentTemperature;
    },
    setForecast: (
      state,
      action: PayloadAction<{ Headline: { Text: string }; DailyForecasts: DailyForecast[] }>
    ) => {
      state.forecast = action.payload;
    },
    setCurrentConditions: (
      state,
      action: PayloadAction<{ cityKey: string; temperature: number; weatherText: string }>
    ) => {
      state.currentConditions = action.payload;
    },
    addToFavorites: (
      state,
      action: PayloadAction<Favorite>
    ) => {
      const existingCity = state.favorites.find((city) => city.id === action.payload.id);

      if (!existingCity) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((city) => city.id !== action.payload);
    },
    setCurrentCityUserLookingFor: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.currentCityUserLookingFor = action.payload;
    },
    setTemperatureUnit: (state, action: PayloadAction<'C' | 'F'>) => {
      state.temperatureUnit = action.payload;
    },
  
  },
});

export const {
  setWeather,
  setForecast,
  setCurrentConditions,
  addToFavorites,
  removeFromFavorites,
  setCurrentCityUserLookingFor,
  setTemperatureUnit ,
} = weatherSlice.actions;
export default weatherSlice.reducer;
