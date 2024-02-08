import React, { useEffect, useState } from "react";
import tripsService, {
  ITrips,
  IUpdateTrips,
} from "../../services/tripsService";
import Header from "../header/Header";
import TripBox from "../searchTrip/TripBox";
import RightArrow from "../icons/RightArrow";

export interface UpdateTripProps {
  tripId: string;
  imgUrl: string;
  userName: string;
  isUserConnected: boolean;
  goToPersonalArea: () => void;
  goToMainPage: () => void;
  goToShare: () => void;
  goToRegister: () => void;
  goToLogin: () => void;
  goToMyTrips: () => void;
  goToSearch: () => void;
  endaleLogOut: () => void;
}

function UpdateTrip({
  tripId,
  isUserConnected,
  imgUrl,
  userName,
  goToPersonalArea,
  goToShare,
  goToSearch,
  goToLogin,
  goToMyTrips,
  goToRegister,
  endaleLogOut,
}: UpdateTripProps) {
  const [currentDay, setCurrentDay] = useState(0);
  const [tripDetails, setTripDetails] = useState<ITrips | null>(null);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);

  const onClickRightArrow = () => {
    setEditMode(false);
  };

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await tripsService.getByTripId(tripId);
        if (Array.isArray(response) && response.length > 0) {
          setTripDetails(response[0]);
          setDescriptions(response[0]?.tripDescription || []);
        } else {
          setTripDetails(null);
          setDescriptions([]);
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
        setTripDetails(null);
        setDescriptions([]);
      }
    };

    fetchTripDetails();
  }, [tripId]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    dayIndex: number
  ) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[dayIndex] = e.target.value;
    setDescriptions(updatedDescriptions);
  };

  const saveChanges = async () => {
    try {
      const updatedTrip: IUpdateTrips = {
        _id: tripId,
        tripDescription: descriptions,
      };
      await tripsService.updateTrip(updatedTrip);
      alert("Trip updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update trip:", error);
    }
  };

  return (
    <>
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
      <article className="update-trip-section">
        {!editMode ? (
          <div>
            <header className="trip-card-profile">
              <img
                className="profile-picture"
                src={tripDetails ? tripDetails.imgUrl : ""}
                alt="Profile"
              />
              <p className="profile-name">
                {tripDetails ? tripDetails.userName : ""}
              </p>
            </header>
            <div className="update-trip-details">
              <section className="trip-card-details">
                <div className="trip-card-tags">
                  <span className="tag">
                    {tripDetails && tripDetails.typeTraveler}
                  </span>
                  <span className="tag">
                    {tripDetails && tripDetails.typeTrip}
                  </span>
                  <span className="tag">
                    {tripDetails && tripDetails.country}
                  </span>
                  <span className="tag">
                    {tripDetails && tripDetails.numOfDays} days
                  </span>
                </div>
                {tripDetails &&
                  tripDetails.tripDescription.map((description, index) => (
                    <div className="trip-day-details" key={index}>
                      <h3 className="trip-day-title">Day {index + 1}</h3>
                      <p className="trip-day-description">{description}</p>
                    </div>
                  ))}
              </section>
              <button className="update-btn" onClick={() => setEditMode(true)}>
                Edit Trip
              </button>
            </div>
          </div>
        ) : (
          <div className="update-trip-details">
            <div className="right-arrow-icon">
              <RightArrow onClickRightArrow={onClickRightArrow} />
            </div>
            <h3 className="day-num">Day {currentDay + 1}</h3>
            <textarea
              className="update-description-box "
              value={descriptions[currentDay] || ""}
              onChange={(e) => handleDescriptionChange(e, currentDay)}
              style={{
                fontSize: "16px", // גודל פונט
                lineHeight: "1.6", // גובה שורה
                fontFamily: "Arial, sans-serif", // גופן
              }}
            ></textarea>
            <div className="update-buttons">
              <button
                className="options"
                onClick={() =>
                  setCurrentDay((prev) =>
                    Math.min(
                      prev + 1,
                      (tripDetails &&
                        tripDetails.tripDescription?.length - 1) ||
                        0
                    )
                  )
                }
              >
                Next Day
              </button>
              <button
                className="options"
                onClick={() => setCurrentDay((prev) => Math.max(prev - 1, 0))}
              >
                Previous Day
              </button>
              <button className="options" onClick={saveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </article>
    </>
  );
}

export default UpdateTrip;
