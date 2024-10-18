import axios from "axios";
import { WeatherData } from "../types/WeatherData";

export const fetchWeatherData = async (location: string) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=ef1d8a30c3b24067b46173740241810&q=${location}&days=7&aqi=no&alerts=yes
`;

  try {
    const response = await axios.get<WeatherData>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data: ${error}`);
    return null;
  }
};
