import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Logout from "../Log/Logout";
import "./header.scss";
const HeaderProfile = () => {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("Users"));
  console.log(JSON.parse(localStorage.getItem("Users")).userid);
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:3000/api/user/${
          JSON.parse(localStorage.getItem("Users")).userid
        }`,
        config
      );
      console.log(result.data);
      setData(result.data);
    };
    fetchData();
  }, []);
  return (
    <header className="header-home">
      <div className="welcomePage">Vos informations {data.surname} !</div>

      <div className="logo-profil">
        <Logout />
        <NavLink exact="true" to="/">
          <img src="./images/feed.png" alt="profile" />
        </NavLink>
      </div>
    </header>
  );
};

export default HeaderProfile;
