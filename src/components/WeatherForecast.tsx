import "../styles/weather-forecast.scss";
import React, { useRef } from "react";
import { icons } from "../assets/assets";
import { WeatherData } from "../types/WeatherData";

interface WeatherForeastProps {
  weatherData: WeatherData | null;
  getFormattedDateTime: (dateJson: string, format: string) => string;
  isCelsius: boolean;
}

const WeatherForecast: React.FC<WeatherForeastProps> = ({
  weatherData,
  getFormattedDateTime,
  isCelsius,
}) => {
  const forecastRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (forecastRef.current) {
      forecastRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (forecastRef.current) {
      forecastRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="column-2">
      <div className="hourly-forecast-wrapper">
        <button className="arrow left-arrow" onClick={scrollLeft}>
          {"<"}
        </button>
        <div className="hourly-forecast" ref={forecastRef}>
          {weatherData?.forecast.forecastday &&
            (() => {
              const allHours = weatherData.forecast.forecastday.flatMap(
                (day) => day.hour
              );
              const now = new Date();
              const currentTimeEpoch = Math.floor(now.getTime() / 1000); // UNIX Timestamp

              const startIndex = allHours.findIndex(
                (hourData) => hourData.time_epoch >= currentTimeEpoch
              );

              const hoursToShow =
                startIndex !== -1
                  ? allHours.slice(startIndex, startIndex + 24)
                  : allHours.slice(0, 24);

              return hoursToShow.map((hourData, index) => (
                <div key={index} className="hour">
                  <small>{getFormattedDateTime(hourData.time, "hour")}</small>
                  <img
                    src={`https:${hourData.condition.icon}`}
                    alt={hourData.condition.text}
                    width="32"
                    height="32"
                  />
                  <p>
                    {Math.round(isCelsius ? hourData.temp_c : hourData.temp_f)}°
                  </p>
                  <div className="header-details">
                    <img src={icons.raindrop} height="12" width="12" />
                    <small>{hourData.chance_of_rain}%</small>
                  </div>
                </div>
              ));
            })()}
        </div>

        <button className="arrow right-arrow" onClick={scrollRight}>
          {">"}
        </button>
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
                          src={icons.raindrop}
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
                      <p id="weekly-avg">
                        {Math.round(
                          isCelsius
                            ? dayData.day.avgtemp_c
                            : dayData.day.avgtemp_f
                        )}
                        °
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default WeatherForecast;
