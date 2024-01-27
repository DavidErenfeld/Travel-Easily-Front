import LeftArrow from "../icons/LeftArrow";
import RightArrow from "../icons/RightArrow";
import Button from "../button/Button";
import "./Share.css";

interface TypesTravelersProps {
  onClickLeftArrow: () => void;
  onClickRightArrow: () => void;
  onClickButtonTypeTraveler: (buttonId: string) => void;
  clickedButtonId: string | null;
}
function TypesTravelers({
  onClickLeftArrow,
  onClickRightArrow,
  onClickButtonTypeTraveler,
  clickedButtonId,
}: TypesTravelersProps) {
  return (
    <section className="container">
      <LeftArrow onClickLeftArrow={onClickLeftArrow} />
      <RightArrow onClickRightArrow={onClickRightArrow} />
      <p className="share-title">We are</p>
      <Button
        text="romantic couple"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedButtonId}
      />

      <Button
        text="happy family"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedButtonId}
      />

      <Button
        text="friends"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedButtonId}
      />

      <Button
        text="seniors"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedButtonId}
      />

      <Button
        text="single"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedButtonId}
      />

      <Button
        text="groups"
        onClickButton={onClickButtonTypeTraveler}
        clickedButtonId={clickedButtonId}
      />
    </section>
  );
}
export default TypesTravelers;
