import LeftArrow from "../icons/LeftArrowIcon";
import RightArrow from "../icons/RightArrowIcon";
import Button from "../button/Button";
import "./Share.css";

interface TypesTravelersProps {
  onClickLeftArrow: () => void;
  onClickRightArrow: () => void;
  onClickButtonTypeTraveler: (buttonId: string) => void;
  clickedTypeTravelerId: string | null;
}
function TypesTravelers({
  onClickLeftArrow,
  onClickRightArrow,
  onClickButtonTypeTraveler,
  clickedTypeTravelerId,
}: TypesTravelersProps) {
  return (
    <section className="container">
      <LeftArrow onClickLeftArrow={onClickLeftArrow} />
      <RightArrow onClickRightArrow={onClickRightArrow} />
      <p className="share-title">We are</p>
      <Button
        text="romantic couple"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedTypeTravelerId}
      />

      <Button
        text="happy family"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedTypeTravelerId}
      />

      <Button
        text="friends"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedTypeTravelerId}
      />

      <Button
        text="seniors"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedTypeTravelerId}
      />

      <Button
        text="single"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedTypeTravelerId}
      />

      <Button
        text="groups"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedTypeTravelerId}
      />
    </section>
  );
}
export default TypesTravelers;
