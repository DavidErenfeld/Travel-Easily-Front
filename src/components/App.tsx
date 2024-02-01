import "../global.css";
import "../components/shareTrip/Share.css";
import { useState } from "react";
import MainPage from "./mainPage/MainPage";
import Search from "./searchTrip/Search";
import Share from "./shareTrip/Shere";
import Login from "./Form/Login";
import Register from "./Form/Register";

function App() {
  const [currentPage, setCurrentPage] = useState("mainPage");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isUserConnected, setIsUserConnected] = useState(false);

  const goToSearch = () => setCurrentPage("search");
  const goToShare = () => {
    setCurrentPage(isUserConnected ? "share" : "login");
  };

  const goToMainPage = () => {
    setCurrentPage("mainPage");
  };

  const goToLogin = () => {
    setCurrentPage("login");
  };

  const goToRegister = () => {
    setCurrentPage("register");
  };

  const onClickClose = () => {
    goToMainPage();
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    if (email === "1020dudu@gmail.com") {
      setIsUserConnected(true);
      setCurrentPage("share");
    } else {
      setCurrentPage("register");
    }
  };

  const onClickRegisterInLoginPage = () => {
    setCurrentPage("register");
  };

  let displayedPage;
  switch (currentPage) {
    case "search":
      displayedPage = (
        <Search
          isUserConnected={isUserConnected}
          goToMainPage={goToMainPage}
          goToShare={goToShare}
          goToSearch={goToSearch}
          goToLogin={goToLogin}
          goToRegister={goToRegister}
        />
      );
      break;
    case "share":
      displayedPage = (
        <Share
          isUserConnected={isUserConnected}
          goToMainPage={goToMainPage}
          goToShare={goToShare}
          goToSearch={goToSearch}
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
    case "register":
      displayedPage = (
        <Register goToMainPage={goToMainPage} onClickClose={onClickClose} />
      );
      break;
    default:
      displayedPage = (
        <MainPage
          goToRegister={goToRegister}
          goToLogin={goToLogin}
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
