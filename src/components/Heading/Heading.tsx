import "./Heading.css";

interface HeadingProps {
  text: string;
}

function Heading({ text }: HeadingProps) {
  return <p className="hero-title">{text}</p>;
}
export default Heading;
