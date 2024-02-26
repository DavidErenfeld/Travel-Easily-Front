import "./MyTrips.css";
import { useEffect, useState } from "react";
import tripsService, {
  CanceledError,
  ITrips,
} from "../../services/tripsService";
import TripBox from "../searchTrip/TripList";
import Header from "../header/Header";

interface MyTripsProps {
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
  goToUpdateTrip: (tripId: string) => void;
  endaleLogOut: () => void;
}

function MyTrips({
  userName,
  imgUrl,
  isUserConnected,
  goToPersonalArea,
  goToShare,
  goToSearch,
  goToLogin,
  goToMyTrips,
  goToRegister,
  endaleLogOut,
  goToUpdateTrip,
}: MyTripsProps) {
  const [trips, setTrips] = useState<ITrips[]>([]);
  const [errors, setErrors] = useState();
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [tripId, setTripId] = useState("");
  const loggedUserId = localStorage.getItem("loggedUserId");

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

  useEffect(() => {
    if (!loggedUserId) {
      console.log("User is not connecte");
      return;
    }
    try {
      tripsService
        .getByOwnerId(loggedUserId)
        .then((data) => {
          console.log(data);
          setTrips(data as ITrips[]);
        })
        .catch((err) => {
          console.error("", err);
          setErrors(err.message);
        });
    } catch (error) {
      console.log("faild");
    }
  }, [loggedUserId]);

  const handleDeleteTrip = (tripId: string) => {
    tripsService
      .deleteTrip(tripId)
      .then(() => {
        // מחיקת הטיול מהרשימה בממשק המשתמש
        const updatedTrips = trips.filter((trip) => trip._id !== tripId);
        setTrips(updatedTrips);
        setIsDeleteClicked(false);
      })
      .catch((error) => {
        console.error("Error deleting trip:", error);
      });
  };
  const handleDeleteClicked = (tripId: string) => {
    setTripId(tripId);
    setIsDeleteClicked(true);
  };

  return (
    <main>
      <Header
        userName={userName}
        imgUrl={imgUrl}
        endaleLogOut={endaleLogOut}
        goToPersonalArea={goToPersonalArea}
        goToShare={goToShare}
        goToRegister={goToRegister}
        goToLogin={goToLogin}
        goToMyTrips={goToMyTrips}
        goToSearch={goToSearch}
        isUserConnected={isUserConnected}
      />
      {isDeleteClicked ? (
        <div className="pop-up">
          <p>Are you sure you want to delete the trip?</p>
          <div className="pop-up-buttons">
            <button onClick={() => handleDeleteTrip(tripId)}>delete</button>
            <button onClick={() => setIsDeleteClicked(false)}>cancel</button>
          </div>
        </div>
      ) : (
        <section className="my-trip-section">
          {trips.map((trip) => (
            <div className="trip-list-item" key={trip._id}>
              <div className="buttons-box">
                <button
                  onClick={() => goToUpdateTrip(trip._id || "")}
                  className="btn-update"
                >
                  update
                </button>
                <button
                  onClick={() => handleDeleteClicked(trip._id || "")}
                  className="btn-delete"
                >
                  delete
                </button>
              </div>

              <TripBox
                key={trip._id}
                trip={trip}
                updateTripCommentsCount={updateTripCommentsCount}
                isUserConnected={isUserConnected}
                onCommentsSelect={() => console.log("onCommentsSelect")}
                onSelect={() => console.log("onSelect")}
              />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default MyTrips;
