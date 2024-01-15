import IconPersonalAriea from "../IconPersonalAriea";
import "./Header.css";

function Header() {
  return (
    <header>
      <img
        className="img-logo"
        src="/imgs/TRAVEL_easily_logo.jpg"
        alt="TRAVEL easily logo"
      />

      <IconPersonalAriea />
    </header>
  );
}
export default Header;
