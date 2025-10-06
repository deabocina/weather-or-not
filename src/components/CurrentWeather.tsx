import "../styles/current-weather.scss";
import React from "react";
import { icons } from "../assets/assets";
import { WeatherData } from "../types/WeatherData";

interface CurrentWeatherProps {
  weatherData: WeatherData | null;
  getFormattedDateTime: (dateJson: string, format: string) => string;
  isCelsius: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weatherData,
  getFormattedDateTime,
  isCelsius,
}) => {
  if (!weatherData) return null;

  const alerts = weatherData.alerts.alert || [];
  const activeAlert = alerts.find((a) =>
    a.headline.toLowerCase().includes(weatherData.location.name.toLowerCase())
  );

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <img src={icons.location} alt="Location" width="20" />
          <h3>
            {weatherData.location.name}, {weatherData.location.country}
          </h3>
        </div>
        <div className="time-info">
          <small>
            {getFormattedDateTime(weatherData.location.localtime, "date")}
          </small>
          <small className="updated">
            Updated{" "}
            {getFormattedDateTime(weatherData.current.last_updated, "hour")}
          </small>
        </div>
      </div>

      <div className="weather-main">
        <div className="temp-section">
          <h1>
            {Math.round(
              isCelsius
                ? weatherData.current.temp_c
                : weatherData.current.temp_f
            )}
            °
          </h1>
          <p className="feels">
            Feels like{" "}
            {Math.round(
              isCelsius
                ? weatherData.current.feelslike_c
                : weatherData.current.feelslike_f
            )}
            °
          </p>
        </div>
        <div className="condition">
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
            width="72"
            height="72"
          />
          <p>{weatherData.current.condition.text}</p>
          <small>
            {Math.round(
              isCelsius
                ? weatherData.forecast.forecastday[0].day.mintemp_c
                : weatherData.forecast.forecastday[0].day.mintemp_f
            )}
            ° /{" "}
            {Math.round(
              isCelsius
                ? weatherData.forecast.forecastday[0].day.maxtemp_c
                : weatherData.forecast.forecastday[0].day.maxtemp_f
            )}
            °
          </small>
        </div>
      </div>

      <div className="weather-stats">
        <div>
          <img src={icons.wind} alt="Wind" />
          <p>
            {Math.round(
              isCelsius
                ? weatherData.current.wind_kph
                : weatherData.current.wind_mph
            )}
            {isCelsius ? " km/h" : " mph"}
          </p>
          <span>Wind</span>
        </div>
        <div>
          <img src={icons.humidity} alt="Humidity" />
          <p>{weatherData.current.humidity}%</p>
          <span>Humidity</span>
        </div>
        <div>
          <img src={icons.pressure} alt="Pressure" />
          <p>
            {isCelsius
              ? weatherData.current.pressure_mb
              : weatherData.current.pressure_in}
            {isCelsius ? " mb" : " in"}
          </p>
          <span>Pressure</span>
        </div>
        <div>
          <img src={icons.sun} alt="UV" />
          <p>{weatherData.current.uv}</p>
          <span>UV Index</span>
        </div>
        <div>
          <img src={icons.precipitation} alt="Precipitation" />
          <p>
            {Math.round(
              isCelsius
                ? weatherData.current.precip_mm
                : weatherData.current.precip_in
            )}
            {isCelsius ? " mm" : " in"}
          </p>
          <span>Precipitation</span>
        </div>
        <div>
          <img src={icons.visibility} alt="Visibility" />
          <p>
            {isCelsius
              ? weatherData.current.vis_km
              : weatherData.current.vis_miles}
            {isCelsius ? " km" : " mi"}
          </p>
          <span>Visibility</span>
        </div>
      </div>

      {activeAlert && (
        <div className="alert-bar">
          <img src={icons.alert} alt="Alert" width="20" />
          <p>{activeAlert.headline}</p>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
