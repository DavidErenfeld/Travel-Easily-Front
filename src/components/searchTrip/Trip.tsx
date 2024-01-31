import { useRef, useEffect } from "react";
import LeftArrow from "../icons/LeftArrow";
import { ITrips } from "./Search";
import SubmitIcon from "../icons/SubmitIcon";

export interface TripProps {
  trip: ITrips;
  onSelect: () => void;
  goToList: () => void;
  focusOnComments: boolean;
}

function Trip({ trip, goToList, focusOnComments }: TripProps) {
  const commentsInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusOnComments && commentsInputRef.current) {
      commentsInputRef.current.focus(); // מבצע פוקוס לאלמנט
    }
  }, [focusOnComments]);

  const classCommentsList =
    trip.numOfComments > 0 ? "trip-comments-list" : "trip-comments-list-hidden";
  return (
    <>
      <div className="back-arrow">
        <LeftArrow onClickLeftArrow={goToList} />
      </div>
      <article className="trip-details-modal">
        <section className="trip-details-content">
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
          <div className="comments-input">
            <input
              ref={commentsInputRef} // שיוך הרפרנס לאלמנט
              className="comments-input-fild"
              type="text"
              placeholder="Write your comment here"
            />
            <div className="submit-icon-box">
              <SubmitIcon />
            </div>
          </div>
        </section>
        <div className="expanded-comments-section">
          <div className={classCommentsList}>
            {/* {trip.comments?.map((comment, index) => (
            <p className="comment-text">{comment.comment} </p>
          ))} */}
            {/* תאריך ושם משתמש של כותב התגובה יתווספו כאן */}
            <p className="comment-text">
              Whole Day: Took a day trip to Scheveningen, the popular beach
              resort town. Spent the day relaxing by the sea, enjoying the sun,
              and strolling along the pier. The laid-back vibe was a perfect
              break from the busy city touring.
            </p>

            <p className="comment-text">
              Whole Day: Took a day trip to Scheveningen, the popular beach
              resort town. Spent the day relaxing by the sea, enjoying the sun,
              and strolling along the pier. The laid-back vibe was a perfect
              break from the busy city touring.
            </p>

            <p className="comment-text">
              Whole Day: Took a day trip to Scheveningen, the popular beach
              resort town. Spent the day relaxing by the sea, enjoying the sun,
              and strolling along the pier. The laid-back vibe was a perfect
              break from the busy city touring.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

export default Trip;
