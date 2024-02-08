import { useRef, useEffect, useState } from "react";
import LeftArrow from "../icons/LeftArrow";
import tripsService, { ITrips } from "../../services/tripsService";
import SubmitIcon from "../icons/SubmitIcon";

export interface TripProps {
  trip: ITrips;
  onSelect: () => void;
  goToList: () => void;
  focusOnComments: boolean;
  updateTripCommentsCount: (tripId: string, newNumOfComments: number) => void;
}

function Trip({
  trip,
  goToList,
  focusOnComments,
  updateTripCommentsCount,
}: TripProps) {
  const [comments, setComments] = useState(trip.comments || []);
  const commentsInputRef = useRef<HTMLInputElement>(null);

  const [comment, setComment] = useState("");
  const [numOfComments, setNumOfComments] = useState(
    trip.comments ? trip.comments.length : 0
  );
  const loggedUserId = localStorage.getItem("loggedUserId");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitComment = async () => {
    if (comment && trip._id) {
      try {
        const newCommentData = { comment: comment, date: new Date() };
        await tripsService.addComment(trip._id, newCommentData.comment);
        setComments([...comments, newCommentData]);
        setComment("");
        updateTripCommentsCount(trip._id, comments.length + 1);
      } catch (error) {
        console.error("Failed to add comment", error);
      }
    }
  };

  useEffect(() => {
    if (focusOnComments && commentsInputRef.current) {
      commentsInputRef.current.focus();
    }
  }, [focusOnComments]);

  const updateNumOfComments = () => {
    setNumOfComments(comments.length);
  };

  useEffect(() => {
    updateNumOfComments();
  }, [comments]);

  const deleteComment = async (commentId: string) => {
    if (trip._id && commentId) {
      try {
        const response = await tripsService.deleteComment(trip._id, commentId);
        console.log("The comment has been deleted");
        setComments(comments.filter((comment) => comment._id !== commentId));
        setNumOfComments(numOfComments - 1);
      } catch (error) {
        console.log("=============" + error);
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

  return (
    <article className="trip-details-modal">
      <div className="back-arrow">
        <LeftArrow onClickLeftArrow={goToList} />
      </div>
      <section className="trip-details-content">
        <div className="trip-card-tags">
          <span className="tag">{trip.typeTraveler}</span>
          <span className="tag">{trip.typeTrip}</span>
          <span className="tag">{trip.country}</span>
          <span className="tag">{`${trip.numOfDays} days`}</span>
        </div>
        {trip.tripDescription.map((desc, index) => (
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
      <div className="trip-comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment-box">
            <p className="comment-details">{`${formatDate(comment.date)} ${
              comment.owner
            }`}</p>
            {renderDeleteButton(comment._id || "", comment.ownerId || "")}
            <p className="comment-text">{comment.comment}</p>
          </div>
        ))}
      </div>
      <div className="image-gallery">
        {trip.tripPhotos &&
          trip.tripPhotos.map((photo, index) => (
            <img key={index} alt="trip-img" src={photo} />
          ))}
      </div>
    </article>
  );
}

export default Trip;
