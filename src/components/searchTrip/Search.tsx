import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import TripBox from "./TripList";
import LeftArrow from "../icons/LeftArrow";
import Trip, { IComment } from "./SelectedTrip";
import tripsService, {
  CanceledError,
  ITrips,
} from "../../services/tripsService";
import SearchButton from "./SearchButton";

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

  // פונקציה זו מבצעת רענון לנתוני הנסיעות מהשרת
  const refreshData = async () => {
    const { req, abort } = tripsService.getAllTrips();
    req.then((res) => {
      console.log(res.data);
      setTrips(res.data); // כאן אנו עודכנים את הרשימה של הנסיעות
    });
    req.catch((err) => {
      console.log(err);
      if (err instanceof CanceledError) return;
      setErrors(err.message);
    });
  };

  // פונקציה זו מעדכנת את מספר התגובות בכל פעם שנוספה תגובה חדשה
  const updateTripCommentsCount = () => {
    refreshData();
  };

  // פונקציה זו מעדכנת את התגובות עבור נסיעת מסוימת
  const updateCommentsForTrip = (tripId: string, newComments: IComment[]) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) => {
        if (trip._id === tripId) {
          return { ...trip, comments: newComments };
        }
        return trip;
      })
    );
  };

  // בחירת נסיעה מסוימת
  const selectTrip = (trip: ITrips) => {
    setSelectedTrip(trip);
    setIsTripSelected(true);
  };

  // ביטול בחירת נסיעה
  const deselectTrip = async () => {
    setIsTripSelected(false);
    await refreshData();
  };

  // טיפול בלחיצה על חץ החזרה
  const onClickLeftArrow = () => {
    !isTripSelected ? goToMainPage() : goToList();
  };

  // חזרה לרשימת הנסיעות ממצב נסיעה נבחרת
  const goToList = () => {
    setIsTripSelected(false);
  };

  // בחירת נסיעה לצורך הוספת תגובה
  const selectTripForComment = (trip: ITrips) => {
    setSelectedTrip(trip);
    setIsTripSelected(true);
    setFocusOnComments(true);
  };

  // רענון נתונים בעת טעינת העמוד
  useEffect(() => {
    refreshData();
  }, []);

  const onCluckSearchByCountry = () => {
    console.log("on Cluck Search By Country");
  };

  const onClickSearchIcon = () => {
    console.log("on Click Search Icon");
  };

  // פונקציה לעיצוב רשימת הנסיעות
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

  const searchBtnsSectionClass = !isTripSelected
    ? "search-btns-section"
    : "hidden";

  return (
    <>
      <div className="arrow-to-main">
        <LeftArrow onClickLeftArrow={onClickLeftArrow} />
      </div>
      <section className={searchBtnsSectionClass}>
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
      {/* תנאי להצגת פרטי הנסיעה או רשימת הנסיעות */}
      {isTripSelected && selectedTrip && isUserConnected ? (
        <Trip
          updateTripCommentsCount={updateTripCommentsCount}
          updateCommentsForTrip={updateCommentsForTrip}
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
