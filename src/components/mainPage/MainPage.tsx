import Heading from "../Heading/Heading";
import Header from "../header/Header";
import "./MainPage.css";

export interface MainPageProps {
  goToSearch: () => void;
  goToShare: () => void;
}
function MainPage({ goToSearch, goToShare }: MainPageProps) {
  return (
    <>
      <Header />

      <section className="hero-section">
        <Heading text="The new why to travel" />
        <div className="buttons-container">
          <button className="btn" onClick={goToShare}>
            Share trip
          </button>
          <button className="btn" onClick={goToSearch}>
            Search trip
          </button>
        </div>
      </section>
    </>
  );
}
export default MainPage;
