import Button from "../button/Button";
import Header from "../header/Header";
import HeadingSecondry from "../headingSecondry/HeadingSecondry";
import "./Share.css";

function Share() {
  const onClickChoise = () => {
    console.log("clickd");
  };
  return (
    <>
      <Header />
      <section className="hero-section">
        <HeadingSecondry text="Helping people create an amazing travel experience!" />

        <div className="types-travelers-buttons-section">
          <Button text="romantic couple" onClick={onClickChoise} />
          <Button text="happy family" onClick={onClickChoise} />
          <Button text="friends" onClick={onClickChoise} />
          <Button text="Seniors" onClick={onClickChoise} />
          <Button text="single" onClick={onClickChoise} />
          <Button text="groups" onClick={onClickChoise} />
        </div>
      </section>
    </>
  );
}
export default Share;
