import { useState } from "react";
import IconPersonalAriea from "../icons/IconPersonalAriea";
import "./Header.css";

export interface HeaderProps {
  isUserConnected: boolean;
  // onClick: () => void;
}

function Header({ isUserConnected }: HeaderProps) {
  const onClickPersonalAriea = () => {
    console.log("Personal Ariea Clickd");
  };
  return (
    <header>
      <img
        className="img-logo"
        src="/imgs/TRAVEL_easily_logo.jpg"
        alt="TRAVEL easily logo"
      />
      {!isUserConnected ? (
        <IconPersonalAriea onClick={onClickPersonalAriea} />
      ) : (
        <section className="user-profile-personal">
          <img className="profile-picture" src="imgs/Chavi.jpg" alt="Profile" />
          <p className="profile-name">Chavi Erenfeld</p>
        </section>
      )}
    </header>
  );
}
export default Header;
