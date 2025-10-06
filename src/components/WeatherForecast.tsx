import "../styles/weather-forecast.scss";
import React, { useRef } from "react";
import { icons } from "../assets/assets";
import { WeatherData } from "../types/WeatherData";

interface WeatherForecastProps {
  weatherData: WeatherData | null;
  getFormattedDateTime: (dateJson: string, format: string) => string;
  isCelsius: boolean;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  weatherData,
  getFormattedDateTime,
  isCelsius,
}) => {
  const forecastRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => forecastRef.current?.scrollBy({ left: -250, behavior: 'smooth' });
  const scrollRight = () => forecastRef.current?.scrollBy({ left: 250, behavior: 'smooth' });

  if (!weatherData) return null;

  const allHours = weatherData.forecast.forecastday.flatMap(d => d.hour);
  const now = new Date();
  const startIndex = allHours.findIndex(h => h.time_epoch >= Math.floor(now.getTime() / 1000));
  const hoursToShow = startIndex !== -1 ? allHours.slice(startIndex, startIndex + 24) : allHours.slice(0,24);

  return (
    <div className="weather-card forecast-card">
      <div className="weather-header">
        <h3>Forecast</h3>
      </div>

      <div className="hourly-forecast-wrapper">
        <button className="arrow left" onClick={scrollLeft}>‹</button>
        <div className="hourly-list" ref={forecastRef}>
          {hoursToShow.map((h, idx) => (
            <div key={idx} className="hour-card">
              <small>{getFormattedDateTime(h.time, "hour")}</small>
              <img src={`https:${h.condition.icon}`} alt={h.condition.text} width={40} height={40}/>
              <p className="temp">{Math.round(isCelsius ? h.temp_c : h.temp_f)}°</p>
              <div className="rain">
                <img src={icons.raindrop} width={12} height={12} alt="Rain"/>
                <small>{h.chance_of_rain}%</small>
              </div>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={scrollRight}>›</button>
      </div>

      <div className="weekly-list">
        {weatherData.forecast.forecastday.map((day, idx) => {
          const today = new Date().toISOString().split("T")[0];
          return (
            <div key={idx} className="day-card">
              <div className="day-left">
                <p className="day-name">{today===day.date ? "Today" : getFormattedDateTime(day.date, "day")}</p>
                <div className="day-info">
                  <img src={icons.raindrop} width={12} height={12} alt="Rain chance"/>
                  <small>{day.day.daily_chance_of_rain}%</small>
                </div>
              </div>
              <div className="day-right">
                <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} width={48} height={48}/>
                <p className="day-temp">{Math.round(isCelsius ? day.day.avgtemp_c : day.day.avgtemp_f)}°</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeatherForecast;
