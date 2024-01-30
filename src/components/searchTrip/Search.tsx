import "./Search.css";
import { useEffect, useState } from "react";
import Header from "../header/Header";
import TripBox from "./TripBox";
import LeftArrow from "../icons/LeftArrow";
import axios from "axios";
import Trip from "./Trip";

export interface SearchProps {
  isUserConnected: boolean;
  goToMainPage: () => void;
}

export interface ITrips {
  _id?: string;
  userName: string;
  owner: string;
  typeTraveler: string;
  country: string;
  typeTrip: string;
  numOfDays: number;
  tripDescription: string[];
  numOfComments: number;
  numOfLikes: number;

  comments?: Array<{
    owner: string;
    comment: string;
    date: Date;
  }>;

  likes?: Array<{
    owner: string;
    date: Date;
  }>;
}

function Search({ goToMainPage, isUserConnected }: SearchProps) {
  const [trips, setTrips] = useState<ITrips[]>([]);
  const [errors, setErrors] = useState();
  const [selectedTrip, setSelectedTrip] = useState<ITrips | null>(null);
  const [isTripSelected, setIsTripSelected] = useState(false);

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

  useEffect(() => {
    axios
      .get<ITrips[]>("http://localhost:3000/trips")
      .then((res: any) => {
        setTrips(res.data);
      })
      .catch((err) => {
        setErrors(err.message);
      });
    return () => {
      console.log("clean up");
    };
  }, []);

  const renderTrips = () => {
    return trips.map((trip) => (
      <div className="trip-list-item" key={trip._id}>
        <TripBox trip={trip} onSelect={() => selectTrip(trip)} />
      </div>
    ));
  };

  return (
    <>
      <Header isUserConnected={isUserConnected} />
      {isTripSelected && selectedTrip ? (
        <Trip goToList={goToList} trip={selectedTrip} onSelect={deselectTrip} />
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
