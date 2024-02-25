import "./HeadingSecondry.css";

interface HeadingSecondryProps {
  text: string;
}

function HeadingSecondry({ text }: HeadingSecondryProps) {
  return <p className="heading-secondry-text">{text}</p>;
}
export default HeadingSecondry;
