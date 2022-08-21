import React from "react";
//import NewPost from "../components/Posts";
import DisplayPosts from "../components/Posts/DisplayPosts";
import Header from "../components/Header/header";

const Home = () => {
  return (
    <div>
      <Header />

      <div className="containerPost">
        <DisplayPosts />
      </div>
    </div>
  );
};

export default Home;
