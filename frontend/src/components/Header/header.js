import React from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";
const Header = () => {
  return (
    <header className="header-home">
      <div className="welcomePage">Bienvenue sur Grouporama!</div>

      <div className="logo-home">
        <NavLink exact="true" to="/profil">
          <img src="./images/user.svg" alt="profile" />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
