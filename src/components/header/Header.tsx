import { useEffect, useRef, useState } from "react";
import IconPersonalAriea from "../icons/IconPersonalAriea";
import "./Header.css";
import PersonalArea from "./PersonalArea";

export interface HeaderProps {
  isUserConnected: boolean;
  goToSearch: () => void;
  goToLogin: () => void;
  goToRegister: () => void;
  goToShare: () => void;
  // goToLogOut: () => void;
  // goToMyTrips: () => void;
}

function Header({
  isUserConnected,
  goToSearch,
  goToLogin,
  goToRegister,
  goToShare,
}: HeaderProps) {
  const [isPersonalAreaClicked, setIsPersonalAreaClicked] = useState(false);
  const personalAreaRef = useRef<HTMLDivElement>(null); // מציין שה-ref הוא של אלמנט div

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // הוספת סוג ל-event
      if (
        personalAreaRef.current &&
        !personalAreaRef.current.contains(event.target as Node)
      ) {
        setIsPersonalAreaClicked(false);
      }
    };

    // הוספת event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // הסרת event listener כאשר הקומפוננטה יוסרת מה-DOM
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPersonalAreaClicked]);

  const onClickPersonalAriea = () => {
    setIsPersonalAreaClicked(true);
  };

  const onClickSignIn = () => {
    goToLogin();
  };
  const onClickSignUp = () => {
    goToRegister();
  };
  const onClickSearchTrip = () => {
    goToSearch();
  };

  const onClickShareTrip = () => {
    goToShare();
  };

  const onClickMyTrips = () => {
    console.log("onClickMyTrips");
  };
  const onClickLogOut = () => {
    console.log("onClickLogOut");
  };

  return (
    <header>
      <img
        className="img-logo"
        src="/imgs/TRAVEL_easily_logo.jpg"
        alt="TRAVEL easily logo"
      />
      {!isPersonalAreaClicked ? (
        !isUserConnected ? (
          <IconPersonalAriea onClick={onClickPersonalAriea} />
        ) : (
          <section
            onClick={onClickPersonalAriea}
            className="user-profile-personal"
          >
            <img
              className="profile-picture"
              src="imgs/Chavi.jpg"
              alt="Profile"
            />
            <p className="profile-name">Chavi Erenfeld</p>
          </section>
        )
      ) : (
        <div ref={personalAreaRef}>
          <PersonalArea
            isUserConected={isUserConnected}
            onClickSignIn={onClickSignIn}
            onClickSignUp={onClickSignUp}
            onClickShareTrip={onClickShareTrip}
            onClickSearchTrip={onClickSearchTrip}
            onClickMyTrips={onClickMyTrips}
            onClickLogOut={onClickLogOut}
          />
        </div>
      )}
    </header>
  );
}
export default Header;
