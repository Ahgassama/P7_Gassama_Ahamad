import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Log/Logout";
import "./header.scss";
const HeaderProfile = () => {
  return (
    <header className="header-home">
      <div className="welcomePage">Bienvenue sur Grouporama!</div>

      <div className="logo-profil">
        <Logout />
      </div>
    </header>
  );
};

export default HeaderProfile;
/* <NavLink exact="true" to="/auth">
          <img src="./images/logout.png" alt="logout" />
        </NavLink>*/
