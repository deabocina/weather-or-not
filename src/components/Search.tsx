import "../styles/search.scss";
import { useEffect, useState } from "react";
import { icons } from "../assets/assets";

interface Props {
  onSearchChange: (location: string) => void;
  isCelsius: boolean;
  toggleUnits: () => void;
}

interface Location {
  id: number;
  name: string;
  country: string;
}

const Search = ({ onSearchChange, isCelsius, toggleUnits }: Props) => {
  const [location, setLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  useEffect(() => {
    if (location === "") {
      onSearchChange("Split");
    }
  }, [location, onSearchChange]);

  useEffect(() => {
    if (location === "" || location.length < 3) {
      setSuggestions([]);
      return;
    }

    const getSuggestions = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        if (!apiKey) return;

        const response = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${location}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.log(`Error fetching suggestions: ${error}`);
      }
    };

    const timeout = setTimeout(getSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [location]);

  const handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSuggestionClick = (suggestion: Location) => {
    setLocation(suggestion.name);
    onSearchChange(suggestion.name);
    setSuggestions([]);
  };

  return (
    <header className="search-header">
      <div className="logo-container">
        <a href="/weather-or-not/">
          <img src={icons.logo} alt="Logo" className="logo" />
        </a>
      </div>

      <div className="search-wrapper">
        <form>
          <input
            className="search-bar"
            placeholder="Search for location..."
            value={location}
            onChange={handleOnSearchChange}
          />
          <img
            src={icons.search}
            id="search-icon"
            width="20"
            height="20"
            alt="Search Icon"
          />
        </form>

        {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((s) => (
              <li key={s.id} onClick={() => handleSuggestionClick(s)}>
                {s.name}, {s.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={toggleUnits} className="unit-button">
        {isCelsius ? "C°" : "F°"}
      </button>
    </header>
  );
};

export default Search;
