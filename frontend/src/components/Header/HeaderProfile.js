import React from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";
const HeaderProfile = () => {
  return (
    <header className="header-home">
      <div className="welcomePage">Bienvenue sur Grouporama!</div>

      <div className="logo-profil">
        <NavLink exact="true" to="/auth">
          <img src="./images/logout.png" alt="logout" />
        </NavLink>
      </div>
    </header>
  );
};

export default HeaderProfile;
