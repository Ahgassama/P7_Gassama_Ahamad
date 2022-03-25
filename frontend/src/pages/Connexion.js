import React from "react";
import Log from "../components/Log";
const Connexion = () => {
  return (
    <div>
      <div className="logo">
        <img
          src="./images/icon-left-font-monochrome-white.png"
          alt="img-logo"
        />
      </div>
      <div className="homeword">
        <p className="home-style">
          Venez discuter avec vos collègues en toute détente
        </p>
      </div>
      <div>
        <Log />
      </div>
    </div>
  );
};

export default Connexion;
