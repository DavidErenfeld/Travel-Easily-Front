import Button from "../button/Button";
import LeftArrow from "../icons/LeftArrowIcon";
import RightArrow from "../icons/RightArrowIcon";
import "./Share.css";

export interface TypeTripProps {
  onClickLeftArrow: () => void;
  onClickRightArrow: () => void;

  onClickButtonTypeTrip: (buttonId: string) => void;
  clickedTypeTripId: string | null;
}

function TypeTrip({
  onClickRightArrow,
  onClickLeftArrow,
  onClickButtonTypeTrip,
  clickedTypeTripId,
}: TypeTripProps) {
  return (
    <section className="container">
      <LeftArrow onClickLeftArrow={onClickLeftArrow} />
      <RightArrow onClickRightArrow={onClickRightArrow} />
      <p className="type-trip-title">How would you define your trip?</p>

      <Button
        text="attractions"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedTypeTripId}
      />

      <Button
        text="romantic"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedTypeTripId}
      />

      <Button
        text="nature"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedTypeTripId}
      />

      <Button
        text="parties"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedTypeTripId}
      />

      <Button
        text="food"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedTypeTripId}
      />

      <Button
        text="integrated"
        onClickButton={onClickButtonTypeTrip}
        clickedButtonId={clickedTypeTripId}
      />
    </section>
  );
}
export default TypeTrip;
