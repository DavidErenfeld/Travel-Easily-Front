import React, { useState, useEffect, useRef } from "react";
import "./Share.css";

function CountryComponent() {
  const [countries, setCountries] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const suggestionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // console.log(suggestion)
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const names = data.map((country: any) => country.name.common);
        setCountries(names);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    const filtered = searchTerm
      ? countries.filter((country) =>
          country.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      : [];
    setSuggestions(filtered);
    setSelectedSuggestionIndex(-1); // אפס בחירה בכל פעם שהחיפוש משתנה
  }, [searchTerm, countries]);

  useEffect(() => {
    if (suggestionRefs.current[selectedSuggestionIndex] !== null) {
      suggestionRefs.current[selectedSuggestionIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedSuggestionIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const suggestionsCount = suggestions.length;
    if (e.key === "ArrowDown" && suggestionsCount > 0) {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestionsCount - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestionsCount > 0) {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && selectedSuggestionIndex > -1) {
      setSearchTerm(suggestions[selectedSuggestionIndex]);
      setSuggestions([]);
    }
  };

  return (
    <div>
      <input
        className="selection-box"
        type="text"
        id="countrySearch"
        placeholder="In which country did you travel?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <div className="country-list">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            ref={(el) => (suggestionRefs.current[index] = el)}
            className={index === selectedSuggestionIndex ? "selected" : ""}
            onClick={() => {
              setSearchTerm(suggestion);
              setSuggestions([]);
            }}
            onMouseOver={() => setSelectedSuggestionIndex(index)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryComponent;
