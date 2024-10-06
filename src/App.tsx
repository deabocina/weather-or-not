import "./App.css";
import { useState } from "react";
import Search from "./components/Search";
import axios from "axios";

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    tz_id: string;
    localtime: string;
  };
  current: {
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    win_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
  };
  forecast: {
    forecastday: [
      {
        date: string;
        day: {
          maxtemp_c: number;
          maxtemp_f: number;
          mintemp_c: number;
          mintemp_f: number;
          avgtemp_c: number;
          avgtemp_f: number;
          daily_chance_of_rain: number;
          condition: {
            text: string;
            icon: string;
            code: number;
          };
        };
        astro: {
          sunrise: string;
          sunset: string;
        };
        hour: {
          time: string;
          temp_c: number;
          temp_f: number;
          is_day: number;
          condition: {
            text: string;
            icon: string;
            code: number;
          };
          chance_of_rain: number;
        };
      }
    ];
  };
  alerts: {
    alert: [
      {
        headline: string;
        severity: string;
        effective: string;
        expires: string;
      }
    ];
  };
}

function App() {
  const [location, setLocation] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleOnSearchChange = (searchData: string) => {
    setLocation(searchData);
    fetchWeatherData(searchData);
  };

  const fetchWeatherData = async (location: string) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=89ef5b29ca984904980220558242709&q=${location}&days=7&aqi=no&alerts=yes
`;

    try {
      const response = await axios.get<WeatherData>(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  function getFormattedDateTime(dateJson: string, format: string): string {
    const date = new Date(dateJson);
  
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
  
    switch (format) {
      case 'date':
        return `${dayOfWeek}, ${day}.${month}.`;
      case 'day':
        return `${dayOfWeek}`;
      case 'hour':
        return `${hour}:${minute}`;
      case 'alert':
        return `${dayOfWeek} ${hour}:${minute}`;
      default:
        return '';
    }
  }

  return (
    <div>
      <Search onSearchChange={handleOnSearchChange} />
      <div>
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/background-night.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      <div className="container">
        {weatherData && (
          <div className="column-1">
            <div className="weather-container">
              <div className="weather-details">
                <div className="header-details">
                  <img src="/location.png" height="23" width="25"></img>
                  <h3>
                    <b>{weatherData.location.name}</b>,{" "}
                    {weatherData.location.country}
                  </h3>
                </div>
                <p>{getFormattedDateTime(weatherData.location.localtime, "date")}</p>
                <p id="temp">{Math.round(weatherData.current.temp_c)}°</p>
                <p id="bonus-temp">
                  {Math.round(
                    weatherData.forecast.forecastday[0].day.mintemp_c
                  )}
                  ° /{" "}
                  {Math.round(
                    weatherData.forecast.forecastday[0].day.maxtemp_c
                  )}
                  ° Feels like {Math.round(weatherData.current.feelslike_c)}°
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
                  {weatherData.alerts.alert &&
                  weatherData.alerts.alert.length > 0 ? (
                    <>
                      <div className="header-details">
                        <img src="/alert.png" height="20" width="20"></img>
                        <p>{weatherData.alerts.alert[0].headline}</p>
                      </div>
                      <p>
                        {weatherData.alerts.alert[0].severity} warning from{" "}
                        {getFormattedDateTime(
                          weatherData.alerts.alert[0].effective, "alert"
                        )}{" "}
                        until{" "}
                        {getFormattedDateTime(weatherData.alerts.alert[0].expires, "alert")}
                      </p>
                    </>
                  ) : (
                    "No alerts found for this location."
                  )}
                </p>

                <div className="updated-info">
                  <small>
                    Updated {getFormattedDateTime(weatherData.current.last_updated, "hour")}
                  </small>
                </div>
              </div>
            </div>

            <div className="weather-icons">
              <small>
                <img src="/sun.png" height="20" width="20"></img>
                UV index<br></br> {weatherData.current.uv}
              </small>
              <small>
                <img src="/wind.png" height="20" width="20"></img>
                Wind<br></br> {Math.round(weatherData.current.wind_kph)} km/h
              </small>
              <small>
                <img src="/humidity.png" height="20" width="20"></img>
                Humidity<br></br> {weatherData.current.humidity}%
              </small>
              <small>
                <img src="/precipitation.png" height="20" width="20"></img>
                Precipitation<br></br>
                {Math.round(weatherData.current.precip_mm)} mm
              </small>
              <small>
                <img src="/dew-point.png" height="20" width="20"></img>
                Dew point<br></br> {Math.round(weatherData.current.dewpoint_c)}°
              </small>
              <small>
                <img src="/pressure.png" height="20" width="20"></img>
                Pressure<br></br> {weatherData.current.pressure_mb} mb
              </small>
              <small>
                <img src="/visibility.png" height="20" width="20"></img>
                Visibility<br></br> {weatherData.current.vis_km} km
              </small>
            </div>
          </div>
        )}

        <div className="column-2">
          <div className="hourly-forecast">
            {weatherData?.forecast.forecastday[0].hour &&
              Array.isArray(weatherData.forecast.forecastday[0].hour) &&
              weatherData.forecast.forecastday
                .flatMap((forecastDay) => forecastDay.hour)
                .filter((hourData) => {
                  const currentDateTime = new Date();
                  const hourDateTime = new Date(hourData.time);

                  const hoursDifference =
                    (hourDateTime.getTime() - currentDateTime.getTime()) /
                    (1000 * 60 * 60);
                  return hoursDifference >= 0 && hoursDifference < 24;
                })
                .map((hourData, index) => {
                  return (
                    <div key={index} className="hour">
                      <small>{getFormattedDateTime(hourData.time, "hour")}</small>
                      <img
                        src={`https:${hourData.condition.icon}`}
                        alt={hourData.condition.text}
                        width="32"
                        height="32"
                      />

                      <p>{Math.round(hourData.temp_c)}°C</p>

                      <div className="header-details">
                        <img src="/raindrop.png" height="12" width="12"></img>
                        <small>{hourData.chance_of_rain}%</small>
                      </div>
                    </div>
                  );
                })}
          </div>

          <div className="weekly-forecast">
            {weatherData?.forecast.forecastday &&
              Array.isArray(weatherData.forecast.forecastday) &&
              weatherData.forecast.forecastday.map((dayData, index) => {
                const today = new Date().toISOString().split("T")[0];

                return (
                  <div key={index} className="week">
                    <table className="weekly-table">
                      <colgroup>
                        <col style={{ width: "35%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "25%" }} />
                      </colgroup>
                      <tr>
                        <td>
                          {" "}
                          {today === dayData.date
                            ? "Today"
                            : getFormattedDateTime(dayData.date, "day")}
                        </td>
                        <td>
                          {" "}
                          <div className="header-details">
                            <img
                              src="/raindrop.png"
                              height="12"
                              width="12"
                              alt="Chance of rain"
                            ></img>
                            <small>{dayData.day.daily_chance_of_rain}%</small>
                          </div>
                        </td>
                        <td>
                          {" "}
                          <img
                            src={`https:${dayData.day.condition.icon}`}
                            alt={dayData.day.condition.text}
                          ></img>
                        </td>
                        <td>
                          <p>{Math.round(dayData.day.avgtemp_c)}°</p>
                        </td>
                      </tr>
                    </table>
                  </div>
                );
              })}
          </div>
        </div>
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
