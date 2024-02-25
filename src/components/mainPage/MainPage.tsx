import Header from "../header/Header";
import "./MainPage.css";
// import "./queries.css";
import Heading from "../Heading/Heading";

export interface MainPageProps {
  goToPersonalArea: () => void;
  goToSearch: () => void;
  goToShare: () => void;
  goToLogin: () => void;
  goToRegister: () => void;
  goToMyTrips: () => void;
  endaleLogOut: () => void;
  isUserConnected: boolean;
  userName: string;
  imgUrl: string;
}

function MainPage({
  userName,
  imgUrl,
  goToPersonalArea,
  goToSearch,
  goToShare,
  isUserConnected,
  goToLogin,
  goToMyTrips,
  goToRegister,
  endaleLogOut,
}: MainPageProps) {
  return (
    <section className="main-page-section">
      <Header
        goToPersonalArea={goToPersonalArea}
        userName={userName}
        imgUrl={imgUrl}
        endaleLogOut={endaleLogOut}
        goToShare={goToShare}
        goToMyTrips={goToMyTrips}
        goToRegister={goToRegister}
        goToLogin={goToLogin}
        goToSearch={goToSearch}
        isUserConnected={isUserConnected}
      />
      <div className="hero-section">
        <Heading text="The new way to travel" />
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
