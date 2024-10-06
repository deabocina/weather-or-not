import { useEffect, useState } from "react";

interface Props {
  onSearchChange: (searchData: string) => void;
}

const Search = ({ onSearchChange }: Props) => {
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    if (location === "") {
      // setLocation("Split");
      onSearchChange("Split");
    }
  }, [location, onSearchChange]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchData = event.target.value;
    setLocation(searchData);
    onSearchChange(searchData);
  };

  return (
    <div>
      <ul className="nav justify-content-center">
        <li>
          <form>
            <input
              className="search-bar"
              placeholder="Search for location.."
              value={location}
              onChange={handleOnChange}
            />
            <img
              src="/search.png"
              id="search-icon"
              width="20"
              height="20"
              alt="Search Icon"
            ></img>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default Search;
