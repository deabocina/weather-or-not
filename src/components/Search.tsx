import { useEffect, useState } from "react";

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
    if (location === "") {
      setSuggestions([]);
      return;
    }

    const getSuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=89ef5b29ca984904980220558242709&q=${location}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.log(`Error fetching suggestions: ${error}`);
      }
    };

    const handleTimeout = setTimeout(() => {
      getSuggestions();
    }, 300);

    return () => clearTimeout(handleTimeout);
  }, [location]);

  const handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchData = event.target.value;
    setLocation(searchData);
  };

  const handleSuggestionClick = (suggestion: Location) => {
    setLocation(suggestion.name);
    onSearchChange(suggestion.name);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <ul className="nav justify-content-center">
        <li>
          <form>
            <input
              className="search-bar"
              placeholder="Search for location.."
              value={location}
              onChange={handleOnSearchChange}
            />
            <img
              src="/search.png"
              id="search-icon"
              width="20"
              height="20"
              alt="Search Icon"
            />
          </form>
          {suggestions.length > 0 && (
            <ul className="suggestion-list">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}, {suggestion.country}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>

      <button onClick={toggleUnits} className="unit-button">
        {isCelsius ? "C°" : "F°"}
      </button>
    </div>
  );
};

export default Search;
