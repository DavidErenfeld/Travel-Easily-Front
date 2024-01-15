import "./Button.css";

export interface ButtonProps {
  text: string;
  onClick: () => void;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <>
      <button onClick={onClick} className="btn">
        {text}
      </button>
    </>
  );
}
export default Button;
