import "./Button.css";

export interface ButtonProps {
  text: string;
  onClickButton: (buttonId: string) => void;
  clickedButtonId: string | null;
}

function Button({ text, onClickButton, clickedButtonId }: ButtonProps) {
  // console.log("onClickButton type in Button component:", typeof onClickButton);
  return (
    <>
      <button
        className="btn"
        style={clickedButtonId === text ? { backgroundColor: "#077b83" } : {}}
        onClick={() => onClickButton(text)}
      >
        {text}
      </button>
    </>
  );
}
export default Button;
