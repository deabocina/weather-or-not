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

  const handleOnSearchChange = async (searchData: string) => {
    setLocation(searchData);
    const data = await fetchWeatherData(searchData);
    if (data) {
      setWeatherData(data);
    }
  };

  const videoOption =
    weatherData?.current.is_day === 1
      ? "/background-day.mp4"
      : "/background-night.mp4";

  return (
    <div>
      <Search onSearchChange={handleOnSearchChange} />
      <div>
        <video
          key={videoOption}
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
        >
          <source src={videoOption} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container">
        <CurrentWeather
          weatherData={weatherData}
          getFormattedDateTime={getFormattedDateTime}
        />

        <WeatherForecast
          weatherData={weatherData}
          getFormattedDateTime={getFormattedDateTime}
        />
      </div>

      <footer>
        Powered by &nbsp;
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
