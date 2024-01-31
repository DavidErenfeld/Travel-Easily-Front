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

export interface SearchProps {
  isUserConnected: boolean;
  goToMainPage: () => void;
}

function Search({ goToMainPage, isUserConnected }: SearchProps) {
  const [trips, setTrips] = useState<ITrips[]>([]);
  const [errors, setErrors] = useState();
  const [selectedTrip, setSelectedTrip] = useState<ITrips | null>(null);
  const [isTripSelected, setIsTripSelected] = useState(false);
  const [focusOnComments, setFocusOnComments] = useState(false);

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
    return () => {
      abort();
    };
  }, []);

  const renderTrips = () => {
    return trips.map((trip) => (
      <div className="trip-list-item" key={trip._id}>
        <TripBox
          onCommentsSelect={selectTripForComment}
          trip={trip}
          onSelect={() => selectTrip(trip)}
        />
      </div>
    ));
  };

  return (
    <>
      <Header isUserConnected={isUserConnected} />
      {isTripSelected && selectedTrip ? (
        <Trip
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
          {renderTrips()}
        </main>
      )}
    </>
  );
}
export default Search;
