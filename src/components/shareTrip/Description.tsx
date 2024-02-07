import "./Share.css";

import AddImgs from "../icons/AddImgsIcon";

import AddPicture from "../icons/AddPicture";
import { useState } from "react";
import RightArrow from "../icons/RightArrow";
import LeftArrow from "../icons/LeftArrow";

interface DescriptionProps {
  dayNumber: number;
  onClickRightArrow: () => void;
  onClickLastDay: (num: number) => void;
  updateDescriptions: (descriptions: string[]) => void;
  handleFinish: () => void;
  finish: boolean;
}

function Description({
  finish,
  dayNumber,
  updateDescriptions,
  onClickRightArrow,
  onClickLastDay,
  handleFinish,
}: DescriptionProps) {
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
    updateDescriptions(descriptions);
    if (num < dayNumber) {
      setNum(num + 1);
    }
    if (num === dayNumber) {
      onClickLastDay(num);
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

      {!finish ? (
        <div className="change-day-description-block">
          {
            <p onClick={updateNextDay} className="change-day-description">
              next day
            </p>
          }
          {num > 1 && (
            <p onClick={updateDayBefore} className="change-day-description">
              day before
            </p>
          )}

          {/* {num === dayNumber && <button onClick={handleFinish}>send</button>} */}
        </div>
      ) : (
        <p className="change-day-description" onClick={handleFinish}>
          send
        </p>
      )}
    </section>
  );
}

export default Description;
