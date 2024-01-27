import React, { useState } from "react";
import Header from "../header/Header";
import Login from "../Form/Login";
import Register from "../Form/Register";
import Search from "../searchTrip/Search";
import "./MainPage.css";
import Heading from "../Heading/Heading";

export interface MainPageProps {
  goToSearch: () => void;
  goToShare: () => void;
  isUserConnected: boolean;
}

function MainPage({ goToSearch, goToShare, isUserConnected }: MainPageProps) {
  return (
    <section className="main-page-section">
      <Header isUserConnected={isUserConnected} />
      <div className="hero-section">
        <Heading text="The new why to travel" />
        <div className="buttons-container">
          <button className="btn" onClick={goToShare}>
            Share trip
          </button>
          <button className="btn" onClick={goToSearch}>
            Search trip
          </button>
        </div>
      </div>
    </section>
  );
}

export default MainPage;
