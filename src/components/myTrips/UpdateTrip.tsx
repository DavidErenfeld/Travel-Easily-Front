import React, { useEffect, useState } from "react";
import tripsService, {
  ITrips,
  IUpdateTrips,
} from "../../services/tripsService";
import Header from "../header/Header";
import RightArrow from "../icons/RightArrowIcon";
import SuccessfulCompletion from "../shareTrip/SuccessfulCompletion";
import LoadingDots from "../Loader";

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
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [tripIsUpdated, setTripIsUpdated] = useState(false);
  const [tripDetails, setTripDetails] = useState<ITrips>();
  const [loading, setLoading] = useState(true);

  const onClickRightArrow = () => {
    goToMyTrips();
  };

  const fetchTripDetails = async () => {
    try {
      const newTrip = await tripsService.getByTripId(tripId);
      setTripDetails(newTrip);
      setDescriptions(newTrip.tripDescription);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching updated trip:", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTripDetails();
  }, []);

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
      setLoading(true);
      await tripsService.updateTrip(updatedTrip);
      console.log("Trip updated successfully!");
      setTripIsUpdated(true);
      setLoading(false);
    } catch (error) {
      console.error("Failed to update trip:", error);
      setLoading(false);
    }
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
      ) : !tripIsUpdated ? (
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
              fontSize: "16px",
              lineHeight: "1.6",
              fontFamily: "Arial, sans-serif",
            }}
          ></textarea>
          <div className="update-buttons">
            <button
              className="options"
              onClick={() =>
                setCurrentDay((prev) =>
                  Math.min(
                    prev + 1,
                    (tripDetails && tripDetails.tripDescription?.length - 1) ||
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
          </div>
          <button className="save-changes-btn" onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      ) : (
        <div className="update-trip-details">
          <SuccessfulCompletion
            title="Update Successful"
            secondaryTitle="Your Travel Update Enhances the Journey for All!"
            text=" We appreciate your commitment to refining your travel experience for the benefit of our community! "
            onClickHomePage={goToMyTrips}
            buttonText="my trips"
          />
        </div>
      )}
    </main>
  );
}

export default UpdateTrip;
