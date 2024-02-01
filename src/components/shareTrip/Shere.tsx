import { useState } from "react";
import Header from "../header/Header";
import HeadingSecondry from "../headingSecondry/HeadingSecondry";
import TypesTravelers from "./TypesTravelers";
import TypeTrip from "./TypeTrip";
import NumOfDays from "./NumOfDays";
import Description from "./Description";
import SuccessfulCompletion from "./SuccessfulCompletion";

export interface ShareProps {
  isUserConnected: boolean;
  goToMainPage: () => void;
  goToShare: () => void;
  goToRegister: () => void;
  goToLogin: () => void;
  goToSearch: () => void;
}

function Share({
  isUserConnected,
  goToMainPage,
  goToShare,
  goToSearch,
  goToLogin,
  goToRegister,
}: ShareProps) {
  const [isTravelerTypeSelected, setIsTravelerTypeSelected] = useState(false);
  const [selectedTravelerType, setSelectedTravelerType] = useState<
    string | null
  >(null);

  const [isTripTypeSelected, setIsTripTypeSelected] = useState(false);
  const [selectedTripType, setSelectedTripType] = useState<string | null>(null);

  const [isNumOfDaysSelected, setIsNumOfDaysSelected] = useState(false);

  const [numOfDays, setNumOfDays] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(false);

  const [sendSuccessMessage, setSendSuccessMessage] = useState(false);

  const handleCountrySelect = (country: string) => {
    console.log("Selected Country:", country);
    if (country !== null) setSelectedCountry(true);
    // כאן תוכל לבצע פעולות נוספות עם המדינה הנבחרת
  };

  const onClickLeftArrow1 = () => {
    if (selectedTravelerType) setIsTravelerTypeSelected(true);
  };

  const onClickLeftArrow2 = () => {
    if (selectedTripType) setIsTripTypeSelected(true);
  };

  const onClickLeftArrow3 = (days: number) => {
    if (numOfDays > 0 && selectedCountry) setIsNumOfDaysSelected(true);
    setNumOfDays(days);
  };

  const onClickRightArrow1 = () => {
    goToMainPage(); // שימוש בפונקציה לחזרה ל-MainPage
  };

  const onClickRightArrow2 = () => {
    setIsTravelerTypeSelected(false);
  };

  const onClickRightArrow3 = () => {
    setIsTripTypeSelected(false);
  };

  const onClickRightArrow4 = () => {
    setIsNumOfDaysSelected(false);
  };

  const onClickButtonTypeTraveler = (buttonId: string) => {
    setSelectedTravelerType(buttonId);
  };

  const onClickButton2 = (buttonId: string) => {
    setSelectedTripType(buttonId);
  };

  const onClickLastDay = (num: number) => {
    if (num === numOfDays) setSendSuccessMessage(true);
  };

  const onClickHomePage = () => {
    goToMainPage();
  };

  const HeadingSecondryClassName = !sendSuccessMessage
    ? "heading-secondry"
    : "heading-secondry-hidden";

  return (
    <>
      <Header
        goToShare={goToShare}
        goToRegister={goToRegister}
        goToLogin={goToLogin}
        goToSearch={goToSearch}
        isUserConnected={isUserConnected}
      />
      <section className="hero-section">
        <div className={HeadingSecondryClassName}>
          <HeadingSecondry text="Helping people create an amazing travel experience!" />
        </div>
        {!isTravelerTypeSelected ? (
          <TypesTravelers
            onClickLeftArrow={onClickLeftArrow1}
            onClickRightArrow={onClickRightArrow1}
            onClickButtonTypeTraveler={onClickButtonTypeTraveler}
            clickedButtonId={selectedTravelerType}
          />
        ) : !isTripTypeSelected ? (
          <TypeTrip
            onClickRightArrow={onClickRightArrow2}
            onClickLeftArrow={onClickLeftArrow2}
            onClickButtonTypeTrip={onClickButton2}
            clickedButtonId2={selectedTripType}
          />
        ) : !isNumOfDaysSelected ? (
          <NumOfDays
            onCountrySelect={handleCountrySelect}
            onClickSave={onClickLeftArrow3}
            onClickRightArrow={onClickRightArrow3}
          />
        ) : !sendSuccessMessage ? (
          <Description
            onClickLastDay={onClickLastDay}
            dayNumber={numOfDays}
            onClickRightArrow={onClickRightArrow4}
          />
        ) : (
          <SuccessfulCompletion onClickHomePage={onClickHomePage} />
        )}
      </section>
    </>
  );
}

export default Share;
