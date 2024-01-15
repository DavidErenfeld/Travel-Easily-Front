import Heading from "../Heading/Heading";
import Button from "../button/Button";
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
          <Button onClick={goToShare} text="Share trip" />
          <Button onClick={goToSearch} text="Search trip" />
        </div>
      </section>
    </>
  );
}
export default MainPage;
