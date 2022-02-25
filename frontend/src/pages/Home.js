import React from "react";
import NewPost from "../components/Posts";
//import Feed from "../components/Posts";
const Home = () => {
  return (
    <div>
      <div className="header-home">
        <div className="welcomePage">Bienvenue sur Grouporama!</div>

        <div className="logo-home">
          <img src="./images/user.svg" alt="profile" />
        </div>
      </div>
      <div className="containerPost">
        <NewPost />
      </div>
    </div>
  );
};

export default Home;
