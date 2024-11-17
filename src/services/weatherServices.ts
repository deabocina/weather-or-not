import axios from "axios";
import { WeatherData } from "../types/WeatherData";

export const fetchWeatherData = async (location: string) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  if (!apiKey) {
    console.error("API key is missing.");
    return;
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=yes`;

  try {
    const response = await axios.get<WeatherData>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data: ${error}`);
    return null;
  }
};
