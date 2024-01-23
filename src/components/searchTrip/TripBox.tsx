import CommentsIcon from "../icons/CommentsIcon";
import Like from "../icons/Like";
import "./Search.css";

export interface TripBoxProps {
  onClickTrip: () => void;
  onClickLike: () => void;
  numOfLikes: number;
  onClickComments: () => void;
}
function TripBox({
  onClickTrip,
  onClickLike,
  numOfLikes,
  onClickComments,
}: TripBoxProps) {
  return (
    <div className="a">
      <div className="profile">
        <img className="profile-picture" src="imgs/Chavi.jpg" />
        <p className="profile-name">Chvi Erenfeld</p>
      </div>

      <div className="like-comments">
        <div className="like-box">
          <div className="num-of-likes">{numOfLikes}</div>
          <Like onClickLike={onClickLike} />
        </div>
        <div className="comments-box">
          <div className="num-of-comments">0</div>
          <CommentsIcon onClickComments={onClickComments} />
        </div>
      </div>
      <div className="trip-box">
        <div className="trip-tags-box">
          <span className="trip-tags">romantic couple</span>
          <span className="trip-tags">attractions</span>
          <span className="trip-tags">Israel</span>
          <span className="trip-tags">3 days</span>
        </div>

        <div onClick={onClickTrip} className="trip-day-description">
          <p className="trip-day">day 1</p>
          <p className="trip-description">
            Start with exploring historical sites, followed by lunch at a local
            bistro. Afternoon spent exploring historical sites and evening at a
            popular local spot, with exploring historical sites, followed by
            lunch at a local bistro. Afternoon spent exploring,with exploring
            historical sites, followed by lunch at a local bistro. Afternoon
            spent exploring
          </p>
        </div>
        <div className="trip-day-description">
          <p className="trip-day">day 2</p>
          <p className="trip-description">
            Start with exploring historical sites, followed by lunch at a local
            bistro. Afternoon spent exploring historical sites and evening at a
            popular local spot, with bistro. Afternoon spent exploring
            historical
          </p>
        </div>
        <div className="trip-day-description">
          <p className="trip-day">day 3</p>
          <p className="trip-description">
            Start with exploring historical sites, followed by lunch at a local
            bistro. Afternoon spent exploring historical sites and evening at a
            popular local spot, with bistro. Afternoon spent exploring
            historical,followed by lunch at a local bistro. Afternoon spent
            exploring historical sites and evening at a popular local spot, with
            bistro. Afternoon spent
          </p>
        </div>
      </div>
    </div>
  );
}

export default TripBox;
