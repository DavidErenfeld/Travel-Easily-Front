import Button from "../button/Button";
import LeftArrow from "../icons/LeftArrow";
import RightArrow from "../icons/RightArrow";
import "./Share.css";

export interface TypeTripProps {
  onClickLeftArrow: () => void;
  onClickRightArrow: () => void;
 
  onClickButtonTypeTrip: (buttonId: string) => void;
  clickedButtonId2: string | null;
}

function TypeTrip({
  onClickRightArrow,
  onClickLeftArrow,
  onClickButtonTypeTrip,
  clickedButtonId2,
}: TypeTripProps) {
  return (
    <section className="container">
      <LeftArrow onClickLeftArrow={onClickLeftArrow} />
      <RightArrow onClickRightArrow={onClickRightArrow} />
      <p className="type-trip-title">How would you define your trip?</p>

      <Button
        text="attractions"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedButtonId2}
      />

      <Button
        text="romantic"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedButtonId2}
      />

      <Button
        text="nature"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedButtonId2}
      />

      <Button
        text="parties"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedButtonId2}
      />

      <Button
        text="food"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedButtonId2}
      />

      <Button
        text="integrated"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedButtonId2}
      />
    </section>
  );
}
export default TypeTrip;
