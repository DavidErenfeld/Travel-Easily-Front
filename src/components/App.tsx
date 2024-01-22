import "../global.css";
import "../style.css";
import { useState } from "react";
import MainPage from "./mainPage/MainPage";
import Search from "./searchTrip/Search";
import Share from "./shareTrip/Shere";
import Country from "./shareTrip/Country";

function App() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isShareClicked, setIsShareClicked] = useState(false);
  // const [isOneOfShareButtonsClicked, setIsOneOfShareButtonsClicked] =
  //   useState(false);

  const onClickSearch = () => {
    setIsSearchClicked(true);
  };

  const onClickShare = () => {
    setIsShareClicked(true);
  };

  // const onClickShareButtons = () => {
  //   setIsOneOfShareButtonsClicked(true);
  // };

  return (
    <>
      <div className="background"></div>
      {!isSearchClicked && !isShareClicked ? (
        <MainPage goToSearch={onClickSearch} goToShare={onClickShare} />
      ) : isSearchClicked ? (
        <Search />
      ) : (
        <Share />
      )}
    </>
  );
}

export default App;
