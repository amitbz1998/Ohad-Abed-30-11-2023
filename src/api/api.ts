const API_KEY = "zIZ39GdLniX9GdtH05VNrGAKSU98l34j";

export const getLocationsAutocomplete = async (searchTerm: string) => {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${searchTerm}&apikey=${API_KEY}`
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching locations:", response.statusText);
      throw new Error("Error fetching locations");
    }
  } catch (error) {
    console.error("Network error:", (error as Error).message);
    throw new Error("Network error");
  }
};

export const get5DayForecast = async (locationKey: string) => {
    try {
      const response = await fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`
      );
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching 5-day forecast:", response.statusText);
        throw new Error("Error fetching 5-day forecast");
      }
    } catch (error) {
      console.error("Network error:", (error as Error).message);
      throw new Error("Network error");
    }
  };

  export const getCurrentConditions = async (locationKey: string) => {
    try {
      const response = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
      );
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching current conditions:", response.statusText);
        throw new Error("Error fetching current conditions");
      }
    } catch (error) {
      console.error("Network error:", (error as Error).message);
      throw new Error("Network error");
    }
  };
  