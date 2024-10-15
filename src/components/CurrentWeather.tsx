import React from "react";
import { WeatherData } from "../types/WeatherData";

interface CurrentWeatherProps {
  weatherData: WeatherData | null;
  getFormattedDateTime: (dateJson: string, format: string) => string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weatherData,
  getFormattedDateTime,
}) => {
  if (!weatherData) return "";

  return (
    <div className="column-1">
      <div className="weather-container">
        <div className="weather-details">
          <div className="header-details">
            <img
              src="/location.png"
              height="23"
              width="25"
              alt="Location icon"
            />
            <h3>
              <b>{weatherData.location.name}</b>, {weatherData.location.country}
            </h3>
          </div>
          <p>{getFormattedDateTime(weatherData.location.localtime, "date")}</p>
          <p id="temp">{Math.round(weatherData.current.temp_c)}°</p>
          <p id="bonus-temp">
            {Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}° /{" "}
            {Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}°
            Feels like {Math.round(weatherData.current.feelslike_c)}°
          </p>

          <p id="temp-text">
            {weatherData.current.condition.text}{" "}
            <img
              src={`https:${weatherData.current.condition.icon}`}
              alt={weatherData.current.condition.text}
              width="64"
              height="64"
            />
          </p>

          <p>
            {weatherData.alerts.alert && weatherData.alerts.alert.length > 0 ? (
              <>
                <div className="header-details">
                  <img
                    src="/alert.png"
                    height="20"
                    width="20"
                    alt="Alert icon"
                  />
                  <p>{weatherData.alerts.alert[0].headline}</p>
                </div>
                <p>
                  {weatherData.alerts.alert[0].severity} warning from{" "}
                  {getFormattedDateTime(
                    weatherData.alerts.alert[0].effective,
                    "alert"
                  )}{" "}
                  until{" "}
                  {getFormattedDateTime(
                    weatherData.alerts.alert[0].expires,
                    "alert"
                  )}
                </p>
              </>
            ) : (
              "No alerts found for this location."
            )}
          </p>

          <div className="updated-info">
            <small>
              Updated{" "}
              {getFormattedDateTime(weatherData.current.last_updated, "hour")}
            </small>
          </div>
        </div>
      </div>
      <div className="weather-icons">
        <small>
          <img src="/sun.png" height="20" width="20" alt="UV index icon" />
          UV index
          <br /> {weatherData.current.uv}
        </small>
        <small>
          <img src="/wind.png" height="20" width="20" alt="Wind icon" />
          Wind
          <br /> {Math.round(weatherData.current.wind_kph)} km/h
        </small>
        <small>
          <img src="/humidity.png" height="20" width="20" alt="Humidity icon" />
          Humidity
          <br /> {weatherData.current.humidity}%
        </small>
        <small>
          <img
            src="/precipitation.png"
            height="20"
            width="20"
            alt="Precipitation icon"
          />
          Precipitation
          <br />
          {Math.round(weatherData.current.precip_mm)} mm
        </small>
        <small>
          <img
            src="/dew-point.png"
            height="20"
            width="20"
            alt="Dew point icon"
          />
          Dew point
          <br /> {Math.round(weatherData.current.dewpoint_c)}°
        </small>
        <small>
          <img src="/pressure.png" height="20" width="20" alt="Pressure icon" />
          Pressure
          <br /> {weatherData.current.pressure_mb} mb
        </small>
        <small>
          <img
            src="/visibility.png"
            height="20"
            width="20"
            alt="Visibility icon"
          />
          Visibility
          <br /> {weatherData.current.vis_km} km
        </small>
      </div>
    </div>
  );
};

export default CurrentWeather;
