import { useEffect, useState } from "react";
import Header from "../header/Header";
import "./Search.css";
import TripBox from "./TripBox";
import Trips from "../../ArryTrips";
import LeftArrow from "../icons/LeftArrow";
import axios from "axios";
import { any } from "zod";

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
  const onClickRightArrow = () => {
    goToMainPage(); // שימוש בפונקציה לחזרה ל-MainPage
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

  return (
    <>
      <Header isUserConnected={isUserConnected} />
      <main className="main-search-section">
        <div className="arrow-to-main">
          <LeftArrow onClickLeftArrow={onClickRightArrow} />
        </div>

        {trips.map((trip, index) => (
          <div className="trip-section">
            <TripBox trip={trip} key={trip._id} />
          </div>
        ))}
      </main>
    </>
  );
}
export default Search;
