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

  // Handles input changes for the comment field
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // Submits a new comment to the server
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

  // Focuses the comment input field when the component mounts, if focusOnComments is true
  useEffect(() => {
    if (focusOnComments && commentsInputRef.current) {
      commentsInputRef.current.focus();
    }
  }, [focusOnComments]);

  // Updates the numOfComments state
  const updateNumOfComments = () => {
    setNumOfComments(comments.length);
  };

  // Keep numOfComments updated with comments changes
  useEffect(() => {
    updateNumOfComments();
  }, [comments]);

  const deleteComment = async (commentId: string) => {
    if (trip._id && commentId) {
      try {
        const response = await tripsService.deleteComment(trip._id, commentId);
        console.log("The comment has been deleted");
        // הסרת התגובה מהמצב המקומי אחרי מחיקה מוצלחת
        setComments(comments.filter((comment) => comment._id !== commentId));
        console.log("the commente is removed");
      } catch (error) {
        console.log("=============" + error);
      }
    }
  };

  // Renders a delete button for comments owned by the logged-in user
  const renderDeleteButton = (commentId: string, commentOwnerId: string) => {
    // console.log(`loggedUserId: ${loggedUserId}`);
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

  // Formats the comment date string
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
      {/* photos-section */}
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
