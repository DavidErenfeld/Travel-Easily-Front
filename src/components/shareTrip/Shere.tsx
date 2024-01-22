import { useState } from "react";
import Header from "../header/Header";
import HeadingSecondry from "../headingSecondry/HeadingSecondry";
import TypesTravelers from "./TypesTravelers";
import TypeTrip from "./TypeTrip";
import NumOfDays from "./NumOfDays";
import Description from "./Description";

function Share() {
  const [isTravelerTypeSelected, setIsTravelerTypeSelected] = useState(false);
  const [selectedTravelerType, setSelectedTravelerType] = useState<
    string | null
  >(null);

  const [isTripTypeSelected, setIsTripTypeSelected] = useState(false);
  const [selectedTripType, setSelectedTripType] = useState<string | null>(null);

  const [isNumOfDaysSelected, setIsNumOfDaysSelected] = useState(false);

  const [numOfDays, setIsnumOfDays] = useState(0);

  const onClickLeftArrow1 = () => {
    if (selectedTravelerType) setIsTravelerTypeSelected(true);
  };

  const onClickLeftArrow2 = () => {
    if (selectedTripType) setIsTripTypeSelected(true);
  };

  const onClickLeftArrow3 = (days: number) => {
    if (numOfDays > 0) setIsNumOfDaysSelected(true);
    setIsnumOfDays(days);
  };

  const onClickRightArrow1 = () => {
    setIsTravelerTypeSelected(false);
  };

  const onClickRightArrow2 = () => {
    setIsTripTypeSelected(false);
  };

  const onClickRightArrow3 = () => {
    setIsNumOfDaysSelected(false);
  };

  const onClickButtonTypeTraveler = (buttonId: string) => {
    setSelectedTravelerType(buttonId);
  };

  const onClickButton2 = (buttonId: string) => {
    setSelectedTripType(buttonId);
  };

  return (
    <>
      <Header />
      <section className="hero-section">
        <HeadingSecondry text="Helping people create an amazing travel experience!" />
        {!isTravelerTypeSelected ? (
          <TypesTravelers
            onClickLeftArrow={onClickLeftArrow1}
            onClickButtonTypeTraveler={onClickButtonTypeTraveler}
            clickedButtonId={selectedTravelerType}
          />
        ) : !isTripTypeSelected ? (
          <TypeTrip
            onClickRightArrow={onClickRightArrow1}
            onClickLeftArrow={onClickLeftArrow2}
            onClickButtonTypeTrip={onClickButton2}
            clickedButtonId2={selectedTripType}
          />
        ) : !isNumOfDaysSelected ? (
          <NumOfDays
            onClickSave={onClickLeftArrow3}
            onClickRightArrow={onClickRightArrow2}
          />
        ) : (
          <Description
            dayNumber={numOfDays}
            onClickRightArrow={onClickRightArrow3}
          />
        )}
      </section>
    </>
  );
}

export default Share;
