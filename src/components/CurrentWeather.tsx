import React from "react";
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
          <p id="temp">
            {Math.round(
              isCelsius
                ? weatherData.current.temp_c
                : weatherData.current.temp_f
            )}
            °
          </p>
          <p id="bonus-temp">
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
            ° Feels like{" "}
            {Math.round(
              isCelsius
                ? weatherData.current.feelslike_c
                : weatherData.current.feelslike_f
            )}
            °
          </p>

          <div className="updated-info">
            <small>
              Updated{" "}
              {getFormattedDateTime(weatherData.current.last_updated, "hour")}
            </small>
          </div>

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
                <p id="alert-description">
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
        </div>
      </div>
      <div className="weather-icons">
        <small>
          <img src="/sun.png" height="20" width="20" alt="UV index icon" />
          <span>UV index</span>
          <br /> {weatherData.current.uv}
        </small>
        <small>
          <img
            src="/wind.png"
            height="20"
            width="20"
            alt="Wind icon"
            className={`wind-icon ${weatherData.current.wind_dir}`}
          />
          <span>Wind</span>
          <br />{" "}
          {Math.round(
            isCelsius
              ? weatherData.current.wind_kph
              : weatherData.current.wind_mph
          )}{" "}
          {isCelsius ? "km/h" : "mph"}
        </small>
        <small>
          <img src="/humidity.png" height="20" width="20" alt="Humidity icon" />
          <span>Humidity</span>
          <br /> {weatherData.current.humidity}%
        </small>
        <small>
          <img
            src="/precipitation.png"
            height="20"
            width="20"
            alt="Precipitation icon"
          />
          <span>Precipitation</span>
          <br />
          {Math.round(
            isCelsius
              ? weatherData.current.precip_mm
              : weatherData.current.precip_in
          )}{" "}
          {isCelsius ? "mm" : "in"}
        </small>
        <small>
          <img
            src="/dew-point.png"
            height="20"
            width="20"
            alt="Dew point icon"
          />
          <span>Dew point</span>
          <br />{" "}
          {Math.round(
            isCelsius
              ? weatherData.current.dewpoint_c
              : weatherData.current.dewpoint_f
          )}
          °
        </small>
        <small>
          <img src="/pressure.png" height="20" width="20" alt="Pressure icon" />
          <span>Pressure</span>
          <br />{" "}
          {isCelsius
            ? weatherData.current.pressure_mb
            : weatherData.current.pressure_in}{" "}
          {isCelsius ? "mb" : "in"}
        </small>
        <small>
          <img
            src="/visibility.png"
            height="20"
            width="20"
            alt="Visibility icon"
          />
          <span>Visibility</span>
          <br />{" "}
          {isCelsius
            ? weatherData.current.vis_km
            : weatherData.current.vis_miles}{" "}
          {isCelsius ? "km" : "miles"}
        </small>
      </div>
    </div>
  );
};

export default CurrentWeather;
