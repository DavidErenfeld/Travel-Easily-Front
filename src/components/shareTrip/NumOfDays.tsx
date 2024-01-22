import { useState } from "react";
import "./Share.css";
import Country from "./Country";
import RightArrow from "../icons/RightArrow";
import LeftArrow from "../icons/LeftArrow";

export interface NumOfDaysProps {
  onClickSave: (days: number) => void;
  onClickRightArrow: () => void;
}
function NumOfDays({ onClickSave, onClickRightArrow }: NumOfDaysProps) {
  const [days, setDays] = useState(0);

  const handleSaveClick = () => {
    onClickSave(days); // שליחת מספר הימים לפונקציה ב-Share
  };
  return (
    <section className="container">
      <LeftArrow onClickLeftArrow={handleSaveClick} />
      <RightArrow onClickRightArrow={onClickRightArrow} />
      <div className="numOfDays-country-box">
        <input
          type="number"
          min="1"
          className="selection-box num-of-days"
          placeholder="How many days did you travel?"
          onChange={(e) => setDays(parseInt(e.target.value, 10))}
        />
        <Country />
      </div>
    </section>
  );
}
export default NumOfDays;
