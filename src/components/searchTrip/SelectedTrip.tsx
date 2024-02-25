// Trip.tsx

import React, { useRef, useEffect, useState } from "react";
import SubmitIcon from "../icons/SubmitIcon";
import CloseIcon from "../icons/CloseIcon";
import tripsService, { ITrips } from "../../services/tripsService";

export interface IComment {
  _id?: string;
  ownerId?: string;
  owner?: string;
  comment: string;
  date: Date;
}

export interface TripProps {
  trip: ITrips;
  onSelect: () => void;
  focusOnComments: boolean;
  updateTripCommentsCount: () => void;
  // updateCommentsForTrip: (tripId: string, newComments: IComment[]) => void;
  // isPhotosOpen: () => void;
  closePhotos: () => void;
  showPhotos: () => void;
  photos: boolean;
}

function Trip({
  closePhotos,
  photos,
  showPhotos,
  trip,
  focusOnComments,
  updateTripCommentsCount,
}: TripProps) {
  const userName = localStorage.getItem("userName") || "";
  const loggedUserId = localStorage.getItem("loggedUserId") || "";
  // const [comments, setComments] = useState<IComment[]>(trip.comments || []);
  const [comment, setComment] = useState("");

  const [flag, setFlag] = useState(false);
  const commentsInputRef = useRef<HTMLInputElement>(null);
  const [selectedTrip, setTrip] = useState(trip);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitComment = async () => {
    if (comment && trip._id && userName) {
      console.log(
        "Submitting comment:",
        comment,
        "for trip ID:",
        trip._id,
        "by user:",
        userName
      );
      try {
        await tripsService.addComment(trip._id, {
          owner: userName,
          comment,
          date: new Date(),
        });
        updateTripCommentsCount();
        setComment("");
        setFlag(!flag);
        try {
          const newTrip = await tripsService.getByTripId(trip._id);
          setTrip(newTrip);
        } catch (err) {
          console.log("Error fetching updated trip:", err);
        }
      } catch (error) {
        console.error("Failed to add comment", error);
      }
    } else {
      console.log("Missing required fields: comment, trip ID, or user name.");
    }
  };

  const deleteComment = async (commentId: string) => {
    if (trip._id && commentId) {
      try {
        await tripsService.deleteComment(trip._id, commentId);
        console.log("The comment has been deleted");
        updateTripCommentsCount();
        setFlag(!flag);
        try {
          const newTrip = await tripsService.getByTripId(trip._id);
          setTrip(newTrip);
        } catch (err) {
          console.log("Error fetching updated trip:", err);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderDeleteButton = (commentId: string, commentOwnerId: string) => {
    if (commentOwnerId === loggedUserId) {
      return (
        <button
          onClick={() => deleteComment(commentId)}
          className="delete-comment"
        >
          Delete
        </button>
      );
    }
    return null;
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("he-IL");
  };

  // const showPhotos = () => {
  //   setPhotos(true);
  //   isPhotosOpen();
  // };

  useEffect(() => {
    if (focusOnComments && commentsInputRef.current) {
      commentsInputRef.current.focus();
    }
  }, [focusOnComments]);

  return (
    <article className="trip-details-modal">
      {!photos ? (
        <>
          (
          <section className="trip-details-content">
            <div className="trip-card-tags">
              <span className="tag">{selectedTrip.typeTraveler}</span>
              <span className="tag">{selectedTrip.typeTrip}</span>
              <span className="tag">{selectedTrip.country}</span>
              <span className="tag">{`${selectedTrip.numOfDays} days`}</span>
              {selectedTrip.tripPhotos &&
                selectedTrip.tripPhotos?.length > 0 && (
                  <span className="tag photos-btn" onClick={showPhotos}>
                    show pictures
                  </span>
                )}
            </div>
            {selectedTrip.tripDescription &&
              selectedTrip.tripDescription.map((desc, index) => (
                <div className="expanded-trip-day-details" key={index}>
                  <h3 className="trip-day-title">{`Day ${index + 1}`}</h3>
                  <p className="trip-day-description">{desc}</p>
                </div>
              ))}

            <div className="comments-input">
              <input
                ref={commentsInputRef}
                className="comments-input-field"
                type="text"
                placeholder="Write your comment here"
                value={comment}
                onChange={handleCommentChange}
              />
              <div className="submit-icon-box" onClick={submitComment}>
                <SubmitIcon />
              </div>
            </div>
          </section>
          {selectedTrip.numOfComments > 0 && (
            <div className="trip-comments-list">
              {selectedTrip.comments &&
                selectedTrip.comments.map((comment, index) => (
                  <div key={index} className="comment-box">
                    <p className="comment-details">{`${formatDate(
                      comment.date
                    )} ${comment.owner}`}</p>
                    {renderDeleteButton(
                      comment._id || "",
                      comment.ownerId || ""
                    )}
                    <p className="comment-text">{comment.comment}</p>
                  </div>
                ))}
            </div>
          )}
          )
        </>
      ) : (
        <div className="image-gallery">
          <div className="close-btn">
            <CloseIcon onClick={closePhotos} />
          </div>
          {trip.tripPhotos &&
            trip.tripPhotos.map((photo, index) => (
              <img
                className="img-trip"
                key={index}
                alt="trip-img"
                src={photo}
              />
            ))}
        </div>
      )}
    </article>
  );
}

export default Trip;
