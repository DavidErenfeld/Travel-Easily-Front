import { useEffect, useRef, useState } from "react";
import IconPersonalAriea from "../icons/PersonalArieaIcon";
import "./Header.css";
import Navigation from "./Navigation";
import tripsService from "../../services/tripsService";

export interface HeaderProps {
  userName: string;
  imgUrl: string;
  isUserConnected: boolean;
  goToPersonalArea: () => void;
  goToSearch: () => void;
  goToLogin: () => void;
  goToRegister: () => void;
  goToShare: () => void;
  endaleLogOut: () => void;
  goToMyTrips: () => void;
}

function Header({
  isUserConnected,
  goToPersonalArea,
  goToSearch,
  goToLogin,
  goToRegister,
  goToShare,
  goToMyTrips,
  endaleLogOut,
  imgUrl,
  userName,
}: HeaderProps) {
  const [isNavigationClicked, setNavigationClicked] = useState(false);
  const personalAreaRef = useRef<HTMLDivElement>(null); // מציין שה-ref הוא של אלמנט div

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // הוספת סוג ל-event
      if (
        personalAreaRef.current &&
        !personalAreaRef.current.contains(event.target as Node)
      ) {
        setNavigationClicked(false);
      }
    };

    // הוספת event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // הסרת event listener כאשר הקומפוננטה יוסרת מה-DOM
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNavigationClicked]);

  const onClickNavigation = () => {
    setNavigationClicked(true);
  };

  const onClickSignIn = () => {
    goToLogin();
  };

  const onClickPersonalArea = () => {
    goToPersonalArea();
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
    goToMyTrips();
  };

  const onClickLogOut = async () => {
    endaleLogOut();
  };

  return (
    <header>
      <img
        className="img-logo"
        src="/imgs/TRAVEL_easily_logo.jpg"
        alt="TRAVEL easily logo"
      />
      {!isNavigationClicked ? (
        !isUserConnected ? (
          <IconPersonalAriea onClick={onClickNavigation} />
        ) : (
          <section
            onClick={onClickNavigation}
            className="user-profile-personal"
          >
            <img className="profile-picture" src={imgUrl} alt="Profile-img" />
            <p className="profile-name">{userName}</p>
          </section>
        )
      ) : (
        <div ref={personalAreaRef}>
          <Navigation
            isUserConected={isUserConnected}
            onClickSignIn={onClickSignIn}
            onClickSignUp={onClickSignUp}
            onClickPersonalArea={onClickPersonalArea}
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
