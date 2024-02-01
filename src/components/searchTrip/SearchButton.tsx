import SearchIcon from "../icons/SearchIcon";

interface SearchTripProps {
  text: string;
  onClickSearchInput: () => void;
  onClickSearchIcon: () => void;
}

function SearchButton({
  text,
  onClickSearchInput,
  onClickSearchIcon,
}: SearchTripProps) {
  return (
    <div className="search-input-box">
      <div className="search-button-icon">
        <SearchIcon onClick={onClickSearchIcon} />
      </div>
      <input
        className="search-input-btn"
        type="text"
        placeholder={text}
        onClick={onClickSearchInput}
      />
    </div>
  );
}
export default SearchButton;
