import LeftArrow from "../icons/LeftArrow";
import { ITrips } from "./Search";

export interface TripProps {
  trip: ITrips;
  onSelect: () => void;
  goToList: () => void;
}

function Trip({ trip, onSelect, goToList }: TripProps) {
  return (
    <article className="trip-details-modal">
      <div className="back-arrow">
        <LeftArrow onClickLeftArrow={goToList} />
      </div>
      <section className="trip-details-content" onClick={onSelect}>
        <div className="trip-card-tags">
          <span className="tag">{trip.typeTraveler}</span>
          <span className="tag">{trip.typeTrip}</span>
          <span className="tag">{trip.country}</span>
          <span className="tag">{trip.numOfDays} days</span>
        </div>
        {trip.tripDescription.map((trip, index) => (
          <div className="expanded-trip-day-details">
            <h3 className="trip-day-title">Day {index + 1}</h3>
            <p className="trip-day-description">{trip}</p>
          </div>
        ))}
      </section>
      <div className="expanded-comments-section">
        <div className="comments-input">
          <input className="comments-input-fild" type="text" />
        </div>
        <div className="trip-comments-list">
          {trip.comments?.map((comment, index) => (
            <p className="comment-text">{comment.comment} </p>
          ))}
          {/* תאריך ושם משתמש של כותב התגובה יתווספו כאן */}
        </div>
      </div>
    </article>
  );
}

export default Trip;
