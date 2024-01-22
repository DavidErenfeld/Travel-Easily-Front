import "./Share.css";

import AddImgs from "../icons/AddImgs";

import AddPicture from "../icons/AddPicture";
import { useState } from "react";
import RightArrow from "../icons/RightArrow";
import LeftArrow from "../icons/LeftArrow";

interface DescriptionProps {
  dayNumber: number;
  onClickRightArrow: () => void;
}

function Description({ dayNumber, onClickRightArrow }: DescriptionProps) {
  const [num, setNum] = useState(1);
  const [descriptions, setDescriptions] = useState(Array(dayNumber).fill(""));

  const updateDescription = (day: number, newDescription: string) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[day - 1] = newDescription;
    setDescriptions(updatedDescriptions);
    console.log(newDescription);
    console.log(updatedDescriptions);
  };

  const updateNextDay = () => {
    if (num < dayNumber) {
      setNum(num + 1);
    }
  };

  const updateDayBefore = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };

  return (
    <section className="container">
      <RightArrow onClickRightArrow={onClickRightArrow} />
      {/* <LeftArrow /> */}
      <textarea
        className="description-box"
        id="countrySearch"
        placeholder={`Share with us what you did on day ${num}`}
        value={descriptions[num - 1]}
        onChange={(e) => updateDescription(num, e.target.value)}
      ></textarea>

      <div className="icons-description-box">
        <AddImgs />
        <AddPicture />
      </div>

      <div className="change-day-description-block">
        <p onClick={updateNextDay} className="change-day-description">
          next day
        </p>
        <p onClick={updateDayBefore} className="change-day-description">
          day before
        </p>
      </div>
    </section>
  );
}

export default Description;
