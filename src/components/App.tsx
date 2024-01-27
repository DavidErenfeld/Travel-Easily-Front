import "../global.css";
import "../components/shareTrip/Share.css";
import { useState } from "react";
import MainPage from "./mainPage/MainPage";
import Search from "./searchTrip/Search";
import Share from "./shareTrip/Shere";
import Form from "./Form/Register";
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
        <Search goToMainPage={goToMainPage} isUserConnected={isUserConnected} />
      );
      break;
    case "share":
      displayedPage = (
        <Share isUserConnected={isUserConnected} goToMainPage={goToMainPage} />
      );
      break;
    case "login":
      displayedPage = (
        <Login
          onLogin={handleLogin}
          onClickRegister={onClickRegisterInLoginPage}
        />
      );
      break;
    case "register":
      displayedPage = <Register />;
      break;
    default:
      displayedPage = (
        <MainPage
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
