import { useState } from "react";
import Header from "../header/Header";
import "./Search.css";
import TripBox from "./TripBox";

function Search() {
  // let numOfLikes = 0
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
    <>
      <Header />
      <main className="main-search-section">
        <div className="trip-section">
          <TripBox
            onClickTrip={onClickTrip}
            onClickComments={onClickComments}
            onClickLike={onClickLike}
            numOfLikes={numOfLikes}
          />
          <TripBox
            onClickTrip={onClickTrip}
            onClickComments={onClickComments}
            onClickLike={onClickLike}
            numOfLikes={numOfLikes}
          />
          <TripBox
            onClickTrip={onClickTrip}
            onClickComments={onClickComments}
            onClickLike={onClickLike}
            numOfLikes={numOfLikes}
          />
          <TripBox
            onClickTrip={onClickTrip}
            onClickComments={onClickComments}
            onClickLike={onClickLike}
            numOfLikes={numOfLikes}
          />
          <TripBox
            onClickTrip={onClickTrip}
            onClickComments={onClickComments}
            onClickLike={onClickLike}
            numOfLikes={numOfLikes}
          />
          <TripBox
            onClickTrip={onClickTrip}
            onClickComments={onClickComments}
            onClickLike={onClickLike}
            numOfLikes={numOfLikes}
          />
          <TripBox
            onClickTrip={onClickTrip}
            onClickComments={onClickComments}
            onClickLike={onClickLike}
            numOfLikes={numOfLikes}
          />
        </div>
      </main>
    </>
  );
}
export default Search;
