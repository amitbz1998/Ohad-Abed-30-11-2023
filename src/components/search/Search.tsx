import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Container,
  InputAdornment,
  TextField,
  List,
  ListItem,
  ListItemText
  
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setCurrentCityUserLookingFor, setWeather } from "../../store/slices/weatherSlice";
import { getLocationsAutocomplete } from "../../api/api";

interface Location {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const dispatch = useDispatch();
 
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectLocation = (location: Location) => {
    dispatch(
      setWeather({
        cityName: location.LocalizedName,
        currentTemperature: 0,
      })
    );
  
    dispatch(setCurrentCityUserLookingFor({ id: location.Key, name: location.LocalizedName }));
  
    setSearchTerm("");
    setLocations([]);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() !== "") {
        try {
          const data = await getLocationsAutocomplete(searchTerm);
          setLocations(data);
        } catch (error) {
          console.error("Error fetching locations:", (error as Error).message);
        }
      } else {
        setLocations([]);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChange}
        sx={{
          width: "100%",
          maxWidth: 600,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <List
        sx={{
          width: "100%",
          maxWidth: 600,
          zIndex: 999,
          position: "absolute",
          top: "30%",
          background: "white",
        }}
      >
        {locations.map((location) => (
          <ListItem
            key={location.Key}
            button
            onClick={() => handleSelectLocation(location)}
            sx={{ background: "#8cb1d5" }}
          >
            <ListItemText
              primary={`${location.LocalizedName}, ${location.Country.LocalizedName}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
