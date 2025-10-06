import "./App.css";
import { useState } from "react";
import { WeatherData } from "./types/WeatherData";
import { getFormattedDateTime } from "./utils/dateUtils";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast";
import { fetchWeatherData } from "./services/weatherServices";

function App() {
  const [location, setLocation] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  const handleOnSearchChange = async (searchData: string) => {
    setLocation(searchData);
    const data = await fetchWeatherData(searchData);
    if (data) setWeatherData(data);
  };

  const toggleUnits = () => setIsCelsius(!isCelsius);

  return (
    <div className="app">
      <Search
        onSearchChange={handleOnSearchChange}
        isCelsius={isCelsius}
        toggleUnits={toggleUnits}
      />

      <main className="content-container">
        <CurrentWeather
          weatherData={weatherData}
          getFormattedDateTime={getFormattedDateTime}
          isCelsius={isCelsius}
        />

        <WeatherForecast
          weatherData={weatherData}
          getFormattedDateTime={getFormattedDateTime}
          isCelsius={isCelsius}
        />
      </main>

      <footer>
        Powered by&nbsp;
        <a href="https://www.weatherapi.com/" title="Free Weather API">
          <img
            src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
            alt="Weather data by WeatherAPI.com"
          />
        </a>
      </footer>
    </div>
  );
}

export default App;
