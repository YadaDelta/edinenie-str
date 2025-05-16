import React from "react";
import Nav from "../components/Nav.jsx";
import ActiveProjectsBlock from "../components/ActiveProjectsBlock.jsx";
import Footer from "../components/Footer.jsx";

const Main = () => {
  return (
    <>
      <Nav />
      <div className="hero-container">
        <div className="hero-content">
          <div className="text-section">
            <h1>Стройте будущее с нами</h1>
            <p>Купите квартиру в новом доме уже сегодня!</p>
          </div>
          <div className="image-section">
            <img src="main/HeroBlock1.jpeg" alt="Многоэтажный дом" />
          </div>
        </div>
      </div>
      <ActiveProjectsBlock />
      <Footer />
    </>
  );
};

export default Main;
