import { useState } from "react";
import "./Share.css";
import Country from "./Country";
import RightArrow from "../icons/RightArrowIcon";
import LeftArrow from "../icons/LeftArrowIcon";

export interface NumOfDaysProps {
  onClickSave: (days: number) => void;
  onCountrySelect: (country: string) => void;
  onClickRightArrow: () => void;
  flag: boolean;
}
function NumOfDays({
  onClickSave,
  onClickRightArrow,
  onCountrySelect,
  flag,
}: NumOfDaysProps) {
  const [days, setDays] = useState(0);

  const handleSaveClick = () => {
    onClickSave(days);
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
        <Country onCountrySelect={onCountrySelect} />
        {flag && (
          <span className="text-danger">
            please select a number of days and a country
          </span>
        )}
      </div>
    </section>
  );
}
export default NumOfDays;
