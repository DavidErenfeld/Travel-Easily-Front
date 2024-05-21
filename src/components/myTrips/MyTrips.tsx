import "./MyTrips.css";
import { useEffect, useState } from "react";
import tripsService, { ITrips } from "../../services/tripsService";
import TripList from "../searchTrip/TripList";
import Header from "../header/Header";
import LoadingDots from "../Loader";

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
  const [loading, setLoading] = useState(true);

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
      console.log("User is not connected");
      setLoading(false);
      return;
    }
    setLoading(true);
    tripsService
      .getByOwnerId(loggedUserId)
      .then((data) => {
        console.log(data);
        setTrips(data as ITrips[]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading trips:", err);
        setErrors(err.message);
        console.log(errors);
        setLoading(false);
      });
  }, [loggedUserId]);

  const handleDeleteTrip = (tripId: string) => {
    setLoading(true);
    tripsService
      .deleteTrip(tripId)
      .then(() => {
        const updatedTrips = trips.filter((trip) => trip._id !== tripId);
        setTrips(updatedTrips);
        setLoading(false);
        setIsDeleteClicked(false);
      })
      .catch((error) => {
        console.error("Error deleting trip:", error);
        setLoading(false);
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
      {loading ? (
        <div className="main-loader-section">
          <LoadingDots />
        </div>
      ) : isDeleteClicked ? (
        <div className="pop-up">
          <p>Are you sure you want to delete the trip?</p>
          <div className="pop-up-buttons">
            <button onClick={() => handleDeleteTrip(tripId)}>delete</button>
            <button onClick={() => setIsDeleteClicked(false)}>cancel</button>
          </div>
        </div>
      ) : (
        <section className="my-trip-section">
          {trips.length === 0 ? (
            <div className="share-trip-cta">
              <p className="cta-text">
                Have you gone on any exciting trips recently? We'd love to see
                them!
              </p>
              <button className="cta-button" onClick={goToShare}>
                Share Your Adventure
              </button>
            </div>
          ) : (
            trips.map((trip) => (
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
                <TripList
                  key={trip._id}
                  trip={trip}
                  updateTripCommentsCount={updateTripCommentsCount}
                  isUserConnected={isUserConnected}
                  onCommentsSelect={() => console.log("onCommentsSelect")}
                  onSelect={() => console.log("onSelect")}
                />
              </div>
            ))
          )}
        </section>
      )}
    </main>
  );
}

export default MyTrips;
//
