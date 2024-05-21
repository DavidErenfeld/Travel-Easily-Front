import React, { useState, useEffect, useRef } from "react";
import "./Share.css";

interface CountryComponentProps {
  onCountrySelect: (country: string) => void;
}

function CountryComponent({ onCountrySelect }: CountryComponentProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const suggestionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ND6HciJqx38g01MfFWQp5ruk1SgBNQURkdCXSBmJ`,
    };
    fetch("https://countryapi.io/api/all", { headers })
      .then((response) => response.json())
      .then((data) => {
        // המרת האובייקט למערך של ערכים
        const countryArray = Object.values(data);
        // ניצול הפונקציה 'map' על המערך כדי להשיג רשימה של שמות המדינות
        const names = countryArray.map((country: any) => country.name);
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
    setSelectedSuggestionIndex(-1);
  }, [searchTerm, countries]);

  useEffect(() => {
    if (suggestionRefs.current[selectedSuggestionIndex]) {
      suggestionRefs.current[selectedSuggestionIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedSuggestionIndex]);

  const selectCountry = (country: string) => {
    setSearchTerm(country);
    setSuggestions([]);
    onCountrySelect(country);
  };

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
      selectCountry(suggestions[selectedSuggestionIndex]);
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
            onClick={() => selectCountry(suggestion)}
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
