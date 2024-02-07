import "./Search.css";
import { useEffect, useState } from "react";
import Header from "../header/Header";
import TripBox from "./TripBox";
import LeftArrow from "../icons/LeftArrow";
import Trip from "./Trip";
import tripsService, {
  CanceledError,
  ITrips,
} from "../../services/tripsService";
import SearchButton from "./SearchButton";

export interface SearchProps {
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
  const [trips, setTrips] = useState<ITrips[]>([]);
  const [errors, setErrors] = useState();
  const [selectedTrip, setSelectedTrip] = useState<ITrips | null>(null);
  const [isTripSelected, setIsTripSelected] = useState(false);
  const [focusOnComments, setFocusOnComments] = useState(false);

  // בקומפוננטת Search

  const updateTripCommentsCount = (
    tripId: string,
    newNumOfComments: number
  ) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip._id === tripId
          ? { ...trip, numOfComments: newNumOfComments }
          : trip
      )
    );
  };

  const selectTrip = (trip: ITrips) => {
    setSelectedTrip(trip);
    setIsTripSelected(true);
  };

  const deselectTrip = () => {
    setIsTripSelected(false); // מבטל את בחירת הטיול
  };

  const onClickLeftArrow = () => {
    goToMainPage(); // שימוש בפונקציה לחזרה ל-MainPage
  };

  const goToList = () => {
    setIsTripSelected(false);
  };

  const selectTripForComment = (trip: ITrips) => {
    setSelectedTrip(trip);
    setIsTripSelected(true);
    // כאן אנחנו מסמנים שרוצים להציג את שדה התגובות מיד בפתיחה
    setFocusOnComments(true);
  };

  useEffect(() => {
    const { req, abort } = tripsService.getAllTrips();
    req.then((res) => {
      setTrips(res.data);
    });
    req.catch((err) => {
      console.log(err);
      if (err instanceof CanceledError) return;
      setErrors(err.message);
    });
  }, []);

  const onCluckSearchByCountry = () => {
    console.log("on Cluck Search By Country");
  };

  const onClickSearchIcon = () => {
    console.log("on Click Search Icon");
  };

  const renderTrips = () => {
    return trips.map((trip) => (
      <div className="trip-list-item" key={trip._id}>
        <TripBox
          isUserConnected={isUserConnected}
          onCommentsSelect={() => selectTripForComment(trip)}
          trip={trip}
          onSelect={() => selectTrip(trip)}
          updateTripCommentsCount={updateTripCommentsCount}
        />
      </div>
    ));
  };

  return (
    <>
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
          updateTripCommentsCount={updateTripCommentsCount}
          goToList={goToList}
          trip={selectedTrip}
          onSelect={deselectTrip}
          focusOnComments={focusOnComments} // העבר את הסטטוס הזה לקומפוננטת Trip
        />
      ) : (
        <main className="main-search-section">
          <div className="arrow-to-main">
            <LeftArrow onClickLeftArrow={onClickLeftArrow} />
          </div>
          <section className="search-btns-section">
            <SearchButton
              text="search by country"
              onClickSearchIcon={onClickSearchIcon}
              onClickSearchInput={onCluckSearchByCountry}
            />
            <SearchButton
              text="search by country"
              onClickSearchIcon={onClickSearchIcon}
              onClickSearchInput={onCluckSearchByCountry}
            />
            <SearchButton
              text="search by country"
              onClickSearchIcon={onClickSearchIcon}
              onClickSearchInput={onCluckSearchByCountry}
            />
            <SearchButton
              text="search by country"
              onClickSearchIcon={onClickSearchIcon}
              onClickSearchInput={onCluckSearchByCountry}
            />
          </section>
          {renderTrips()}
        </main>
      )}
    </>
  );
}
export default Search;
