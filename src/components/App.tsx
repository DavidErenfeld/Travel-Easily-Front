import "../global.css";
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

  const endaleLogOut = () => {
    setIsUserConnected(false);
    goToMainPage();
  };

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     const refreshToken = localStorage.getItem("refreshToken");
  //     if (refreshToken) {
  //       try {
  //         // ניסיון לרענן את ה-access token באמצעות ה-refresh token
  //         await refreshAccessToken(); // מניחים שהפונקציה עודכנת להחזיר אמת/שקר או לזרוק שגיאה בהתאם
  //         setIsUserConnected(true);
  //         goToMainPage(); // נניח שזו הפונקציה שמנווטת לדף הבית
  //       } catch (error) {
  //         console.error("Failed to refresh token:", error);
  //         setIsUserConnected(false);
  //         goToLogin(); // נניח שזו הפונקציה שמנווטת לדף הלוגין
  //       }
  //     } else {
  //       // אין refresh token, כנראה המשתמש לא מחובר
  //       setIsUserConnected(false);
  //       goToLogin();
  //     }
  //   };

  //   checkAuthStatus();
  // }, []);

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
      <div>{displayedPage}</div>
    </>
  );
}

export default App;
