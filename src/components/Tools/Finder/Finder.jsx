import "./Finder.css";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Finder = ({ type, title, setTitle, setPage, placeholder, searchKey }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setTitle(value);
    setPage(1);

    if (value.length >= 2) {
      setIsSearching(true);
      try {
        const encodedValue = encodeURIComponent(value);
        const response = await axios.get(
          `http://localhost:3000/${type}?${searchKey}=${encodedValue}&limit=5`
        );
        setSuggestions(response.data?.results || []);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (item) => {
    setIsSearching(false);
    setSuggestions([]);
    setTitle("");
    setPage(1);

    if (type === "characters") {
      navigate(`/characters/${item._id}`);
    } else if (type === "comics") {
      navigate(`/comics/comic/${item._id}`);
    }
  };

  return (
    <div className="searchWrap">
      <div className="search">
        <IoSearch />
        <input
          className="finder"
          type="text"
          value={title}
          placeholder={placeholder}
          onChange={handleSearch}
        />
      </div>
      <div className="suggestionsWrap">
        {isSearching && (
          <>
            {suggestions.length > 0 ? (
              <ul className="suggestions">
                {suggestions.map((item) => (
                  <li
                    className="suggestion"
                    key={item._id}
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {item[searchKey]}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun résultat trouvé</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Finder;
