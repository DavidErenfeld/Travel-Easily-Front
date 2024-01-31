import "./Search.css";
import { useState } from "react";
import CommentsIcon from "../icons/CommentsIcon";
import Like from "../icons/Like";
import { ITrips } from "./Search";

interface TripBoxProps {
  trip: ITrips;
  onSelect: () => void;
  onCommentsSelect: (trip: ITrips) => void;
}

function TripBox({ trip, onSelect, onCommentsSelect }: TripBoxProps) {
  const [numOfLikes, setNumOfLikes] = useState(0);

  const onCommentsClick = () => {
    onCommentsSelect(trip);
  };

  const onClickLike = () => {
    console.log("Like Clicked");
  };

  return (
    <article className="trip-card">
      <header className="trip-card-profile">
        <img className="profile-picture" src="imgs/Chavi.jpg" alt="Profile" />
        <p className="profile-name">{trip.userName}</p>
      </header>

      <div className="trip-interactions">
        <div className="like-section">
          <span className="likes-count">{numOfLikes}</span>
          <Like onClickLike={onClickLike} />
        </div>
        <div className="comments-section">
          <span className="comments-count">{trip.numOfComments}</span>
          <CommentsIcon onClickComments={onCommentsClick} />
        </div>
      </div>
      <section className="trip-card-details" onClick={onSelect}>
        <div className="trip-card-tags">
          <span className="tag">{trip.typeTraveler}</span>
          <span className="tag">{trip.typeTrip}</span>
          <span className="tag">{trip.country}</span>
          <span className="tag">{trip.numOfDays} days</span>
        </div>
        {trip.tripDescription.map((description, index) => (
          <div className="trip-day-details">
            <h3 className="trip-day-title">Day {index + 1}</h3>
            <p className="trip-day-description">{description}</p>
          </div>
        ))}
      </section>
    </article>
  );
}

export default TripBox;
