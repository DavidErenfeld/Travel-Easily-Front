import "../queries.css";
import "../index.css";
import "../components/shareTrip/Share.css";
import { useEffect, useState } from "react";
import MainPage from "./mainPage/MainPage";
import Search from "./searchTrip/Search";
import Share from "./shareTrip/Shere";
import Login from "./Form/Login";
import Register from "./Form/Register";
import MyTrips from "./myTrips/MyTrips";
import UpdateTrip from "./myTrips/UpdateTrip";
import PersonalArea from "./header/PersonalArea";
import { refreshAccessToken } from "../services/apiClient";
import tripsService from "../services/tripsService";

function App() {
  const [currentPage, setCurrentPage] = useState("mainPage");
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [tripId, setTripId] = useState("");
  const imgUrl = localStorage.getItem("imgUrl") || "";
  const userName = localStorage.getItem("userName") || "";

  const goToSearch = () => setCurrentPage("search");
  const goToShare = () => {
    setCurrentPage(isUserConnected ? "share" : "login");
  };
  const goToMainPage = () => {
    setCurrentPage("mainPage");
    console.log("aa");
  };
  const goToPersonalArea = () => {
    setCurrentPage("personalArea");
  };
  const goToMyTrips = () => {
    setCurrentPage("myTrips");
  };
  const goToLogin = () => {
    setCurrentPage("login");
  };
  const goToRegister = () => {
    setCurrentPage("register");
  };
  const goToUpdateTrip = (tripId: string) => {
    setCurrentPage("updateTrip");
    setTripId(tripId);
  };

  const onClickClose = () => {
    goToMainPage();
  };

  const handleLogin = (isConnected: boolean) => {
    setIsUserConnected(isConnected);
    goToMainPage();
  };

  const onClickRegisterInLoginPage = () => {
    setCurrentPage("register");
  };

  const endaleLogOut = async () => {
    try {
      await tripsService.logout();
      setIsUserConnected(false);
      goToMainPage();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          await refreshAccessToken();
          setIsUserConnected(true);
          goToMainPage();
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      } else {
        setIsUserConnected(false);
        goToMainPage();
      }
    };
    checkAuthStatus();
  }, []);

  let displayedPage;
  switch (currentPage) {
    case "search":
      displayedPage = (
        <Search
          goToPersonalArea={goToPersonalArea}
          userName={userName}
          imgUrl={imgUrl}
          endaleLogOut={endaleLogOut}
          isUserConnected={isUserConnected}
          goToMainPage={goToMainPage}
          goToShare={goToShare}
          goToMyTrips={goToMyTrips}
          goToSearch={goToSearch}
          goToLogin={goToLogin}
          goToRegister={goToRegister}
        />
      );
      break;
    case "share":
      displayedPage = (
        <Share
          goToPersonalArea={goToPersonalArea}
          userName={userName}
          imgUrl={imgUrl}
          endaleLogOut={endaleLogOut}
          isUserConnected={isUserConnected}
          goToMainPage={goToMainPage}
          goToShare={goToShare}
          goToSearch={goToSearch}
          goToMyTrips={goToMyTrips}
          goToLogin={goToLogin}
          goToRegister={goToRegister}
        />
      );
      break;
    case "login":
      displayedPage = (
        <Login
          onClickClose={onClickClose}
          onLogin={handleLogin}
          onClickRegister={onClickRegisterInLoginPage}
        />
      );
      break;
    case "personalArea":
      displayedPage = (
        <PersonalArea goToMainPage={goToMainPage} imgUrl={imgUrl} />
      );
      break;
    case "myTrips":
      displayedPage = (
        <MyTrips
          goToPersonalArea={goToPersonalArea}
          goToUpdateTrip={goToUpdateTrip}
          isUserConnected={isUserConnected}
          userName={userName}
          imgUrl={imgUrl}
          endaleLogOut={endaleLogOut}
          goToMainPage={goToMainPage}
          goToShare={goToShare}
          goToMyTrips={goToMyTrips}
          goToSearch={goToSearch}
          goToLogin={goToLogin}
          goToRegister={goToRegister}
        />
      );
      break;
    case "updateTrip":
      displayedPage = (
        <UpdateTrip
          goToPersonalArea={goToPersonalArea}
          tripId={tripId}
          isUserConnected={isUserConnected}
          userName={userName}
          imgUrl={imgUrl}
          endaleLogOut={endaleLogOut}
          goToMainPage={goToMainPage}
          goToShare={goToShare}
          goToMyTrips={goToMyTrips}
          goToSearch={goToSearch}
          goToLogin={goToLogin}
          goToRegister={goToRegister}
        />
      );
      break;
    case "register":
      displayedPage = (
        <Register
          goToLogin={goToLogin}
          onClickClose={onClickClose}
          onLogin={handleLogin}
        />
      );
      break;
    default:
      displayedPage = (
        <MainPage
          goToMainPage={goToMainPage}
          goToPersonalArea={goToPersonalArea}
          userName={userName}
          imgUrl={imgUrl}
          endaleLogOut={endaleLogOut}
          goToRegister={goToRegister}
          goToLogin={goToLogin}
          goToMyTrips={goToMyTrips}
          goToSearch={goToSearch}
          goToShare={goToShare}
          isUserConnected={isUserConnected}
        />
      );
  }

  return (
    <>
      <div className="background"></div>
      {displayedPage}
    </>
  );
}

export default App;
