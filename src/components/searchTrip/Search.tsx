// Importing necessary libraries and components
import { useEffect, useState } from "react";
import Header from "../header/Header";
import TripBox from "./TripList";
import LeftArrow from "../icons/LeftArrow";
import Trip, { IComment } from "./SelectedTrip";
import SearchButton from "./SearchButton";
import tripsService, {
  CanceledError,
  ITrips,
} from "../../services/tripsService";
import { number } from "zod";

// Interface for Search component props
interface SearchProps {
  isUserConnected: boolean;
  imgUrl: string;
  userName: string;
  goToPersonalArea: () => void;
  goToMainPage: () => void;
  goToShare: () => void;
  goToRegister: () => void;
  goToLogin: () => void;
  goToSearch: () => void;
  goToMyTrips: () => void;
  endaleLogOut: () => void;
}

// Main Search component
function Search({
  userName,
  imgUrl,
  isUserConnected,
  goToPersonalArea,
  goToMainPage,
  goToShare,
  goToSearch,
  goToLogin,
  goToMyTrips,
  goToRegister,
  endaleLogOut,
}: SearchProps) {
  // State hooks for managing trips, selection, and UI states
  const [trips, setTrips] = useState<ITrips[]>([]);
  const [errors, setErrors] = useState();
  const [selectedTrip, setSelectedTrip] = useState<ITrips | null>(null);
  const [isTripSelected, setIsTripSelected] = useState(false);
  const [focusOnComments, setFocusOnComments] = useState(false);
  const [opnePhotos, setOpnePhotos] = useState(false);
  const [photos, setPhotos] = useState(false);

  // Fetching trips data from the server
  const refreshData = async () => {
    const { req, abort } = tripsService.getAllTrips();
    req
      .then((res) => {
        console.log(res.data);
        setTrips(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof CanceledError) return;
        setErrors(err.message);
      });
  };

  // Selection and UI interaction handlers
  const selectTrip = (trip: ITrips) => {
    if (isUserConnected) {
      setSelectedTrip(trip);
      setIsTripSelected(true);
    }
  };

  const deselectTrip = async () => {
    setIsTripSelected(false);
    await refreshData();
  };

  const onClickLeftArrow = () => {
    !isTripSelected ? goToMainPage() : goToList();
  };

  const goToList = () => {
    setIsTripSelected(false);
  };

  const selectTripForComment = (trip: ITrips) => {
    if (isUserConnected) {
      setSelectedTrip(trip);
      setIsTripSelected(true);
      setFocusOnComments(true);
    }
  };

  const closePhotos = () => {
    setPhotos(false);
    setOpnePhotos(false);
  };

  const showPhotos = () => {
    setPhotos(true);
    setOpnePhotos(true);
  };

  const onCluckSearchByCountry = () => {
    console.log("onCluckSearchByCountry");
  };

  const onClickSearchIcon = () => {
    console.log("onClickSearchIcon");
  };

  // Rendering trips list
  const renderTrips = () => {
    return trips.map((trip) => (
      <article className="trip-list-item" key={trip._id}>
        {/* Changed div to article for semantic meaning */}
        <TripBox
          isUserConnected={isUserConnected}
          onCommentsSelect={() => selectTripForComment(trip)}
          trip={trip}
          onSelect={() => selectTrip(trip)}
          updateTripCommentsCount={refreshData}
        />
      </article>
    ));
  };

  // Conditional class names based on state
  const searchBtnsSectionClass = !isTripSelected
    ? "search-btns-section"
    : "hidden";
  const arrowClass = !opnePhotos ? "arrow-to-main" : "hidden";

  // useEffect hook for initial data load
  useEffect(() => {
    refreshData();
  }, []);

  // Component return statement
  return (
    <>
      <div className={arrowClass}>
        <LeftArrow onClickLeftArrow={onClickLeftArrow} />
      </div>
      <section className={searchBtnsSectionClass}>
        <SearchButton
          text="search by type traveler"
          onClickSearchIcon={onClickSearchIcon}
          onClickSearchInput={onCluckSearchByCountry}
        />
        <SearchButton
          text="search by type trip"
          onClickSearchIcon={onClickSearchIcon}
          onClickSearchInput={onCluckSearchByCountry}
        />
        <SearchButton
          text="search by country"
          onClickSearchIcon={onClickSearchIcon}
          onClickSearchInput={onCluckSearchByCountry}
        />
        <SearchButton
          text="search by num of days"
          onClickSearchIcon={onClickSearchIcon}
          onClickSearchInput={onCluckSearchByCountry}
        />
      </section>
      <Header
        userName={userName}
        imgUrl={imgUrl}
        endaleLogOut={endaleLogOut}
        goToShare={goToShare}
        goToPersonalArea={goToPersonalArea}
        goToRegister={goToRegister}
        goToLogin={goToLogin}
        goToSearch={goToSearch}
        goToMyTrips={goToMyTrips}
        isUserConnected={isUserConnected}
      />
      {isTripSelected && selectedTrip && isUserConnected ? (
        <Trip
          photos={photos}
          closePhotos={closePhotos}
          showPhotos={showPhotos}
          updateTripCommentsCount={refreshData}
          trip={selectedTrip}
          onSelect={deselectTrip}
          focusOnComments={focusOnComments}
        />
      ) : (
        <main className="main-search-section">{renderTrips()}</main>
      )}
    </>
  );
}

export default Search;
