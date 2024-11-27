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
  const locationName = weatherData.location.name.toLowerCase();
  const regionName = weatherData.location.region.toLowerCase();

  const relevantAlerts = weatherData.alerts.alert.filter((alert) => {
    return (
      alert.headline.toLowerCase().includes(locationName) ||
      alert.headline.toLowerCase().includes(regionName)
    );
  });

  return (
    <div className="column-1">
      <div className="weather-container">
        <div className="weather-details">
          <div className="header-details">
            <img
              src={icons.location}
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
            {relevantAlerts && relevantAlerts.length > 0 ? (
              <>
                <div className="header-details">
                  <img
                    src={icons.alert}
                    height="20"
                    width="20"
                    alt="Alert icon"
                  />
                  <p>{relevantAlerts[0].headline}</p>
                </div>
                <p id="alert-description">
                  {relevantAlerts[0].severity} warning from{" "}
                  {getFormattedDateTime(relevantAlerts[0].effective, "alert")}{" "}
                  until{" "}
                  {getFormattedDateTime(relevantAlerts[0].expires, "alert")}
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
          <img src={icons.sun} height="20" width="20" alt="UV index icon" />
          <span>UV index</span>
          <br /> {weatherData.current.uv}
        </small>
        <small>
          <img
            src={icons.wind}
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
          <img
            src={icons.humidity}
            height="20"
            width="20"
            alt="Humidity icon"
          />
          <span>Humidity</span>
          <br /> {weatherData.current.humidity}%
        </small>
        <small>
          <img
            src={icons.precipitation}
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
            src={icons.dewPoint}
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
          <img
            src={icons.pressure}
            height="20"
            width="20"
            alt="Pressure icon"
          />
          <span>Pressure</span>
          <br />{" "}
          {isCelsius
            ? weatherData.current.pressure_mb
            : weatherData.current.pressure_in}{" "}
          {isCelsius ? "mb" : "in"}
        </small>
        <small>
          <img
            src={icons.visibility}
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
