import "./App.css";
import { useState, useEffect } from "react";
import { WeatherData } from "./types/WeatherData";
import { getFormattedDateTime } from "./utils/dateUtils";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast";
import { fetchWeatherData } from "./services/weatherServices";

function App() {
  const [location, setLocation] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isDayTime, setIsDayTime] = useState<boolean>(true);
  const [fade, setFade] = useState<boolean>(false);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  const handleOnSearchChange = async (searchData: string) => {
    setLocation(searchData);
    const data = await fetchWeatherData(searchData);
    if (data) {
      setWeatherData(data);
    }
  };

  const toggleUnits = () => {
    setIsCelsius(!isCelsius);
  };

  useEffect(() => {
    if (weatherData) {
      const newIsDayTime = weatherData.current.is_day === 1;

      if (newIsDayTime !== isDayTime) {
        setFade(true);

        setTimeout(() => {
          setIsDayTime(newIsDayTime);
          setFade(false);
        }, 500);
      }
    }
  }, [weatherData, isDayTime]);

  useEffect(() => {
    if (weatherData) {
      setIsDayTime(weatherData.current.is_day === 1);
    }
  }, [weatherData]);

  return (
    <div>
      <div>
        <Search
          onSearchChange={handleOnSearchChange}
          isCelsius={isCelsius}
          toggleUnits={toggleUnits}
        />
      </div>

      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`background-video day-video ${
            !fade && isDayTime ? "fade-in" : "fade-out"
          }`}
        >
          <source src="/weather-or-not/background-day.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <video
          autoPlay
          loop
          muted
          playsInline
          className={`background-video night-video ${
            !fade && !isDayTime ? "fade-in" : "fade-out"
          }`}
        >
          <source src="/weather-or-not/background-night.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container">
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
