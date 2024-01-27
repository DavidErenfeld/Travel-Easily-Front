import { useState } from "react";
import CommentsIcon from "../icons/CommentsIcon";
import Like from "../icons/Like";
import "./Search.css";
import { ITrips } from "./Search";

interface TripBoxProps {
  trip: ITrips;
}

function TripBox({ trip }: TripBoxProps) {
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [isLikeClickd, setIsLikeClickd] = useState(false);

  const onClickTrip = () => {
    console.log("Trip Clickd");
  };

  const onClickComments = () => {
    console.log("Comments Clickd");
  };

  const onClickLike = () => {
    console.log("Like Clickd");
    if (!isLikeClickd) {
      setNumOfLikes(numOfLikes + 1);
      setIsLikeClickd(true);
    } else {
      setIsLikeClickd(false);
      numOfLikes > 0 ? setNumOfLikes(numOfLikes - 1) : onClickLike();
    }
  };

  return (
    <article className="trip-container">
      <header className="user-profile">
        <img className="profile-picture" src="imgs/Chavi.jpg" alt="Profile" />
        <p className="profile-name">{trip.userName}</p>
      </header>

      <div className="interaction-section">
        <div className="like-section">
          <span className="likes-count">{trip.numOfLikes}</span>
          <Like onClickLike={onClickLike} />
        </div>
        <div className="comments-section">
          <span className="comments-count">{trip.numOfComments}</span>
          <CommentsIcon onClickComments={onClickComments} />
        </div>
      </div>

      <section className="trip-details" onClick={onClickTrip}>
        <div className="trip-tags">
          <span className="tag">{trip.typeTraveler}</span>
          <span className="tag">{trip.typeTrip}</span>
          <span className="tag">{trip.country}</span>
          <span className="tag">{trip.numOfDays}</span>
        </div>

        {trip.tripDescription.map((trip, index) => (
          <div className="trip-day-details">
            <h3 className="day-title">Day {index + 1}</h3>
            <p className="day-description">{trip}</p>
          </div>
        ))}

        {/* 
        <div className="trip-day-details">
          <h3 className="day-title">day 2</h3>
          <p className="day-description">{trips[1]}</p>
        </div>

        <div className="trip-day-details">
          <h3 className="day-title">day 3</h3>
          <p className="day-description">{trips[2]}</p>
        </div> */}
      </section>
    </article>
  );
}

export default TripBox;

// <main className="main-search-section">
// <div className="arrow-to-main">
//   <LeftArrow onClickLeftArrow={onClickRightArrow} />
// </div>

// {trips.map((trip, index) => (
//   <TripBox trip={trip} key={trip._id} /> // העברת אובייקט trip והוספת מפתח
// ))}
// </main>
