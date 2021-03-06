import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profile";
import Connexion from "../../pages/Connexion";

const index = () => {
  return (
    <div>
      <Routes>
        <Route default path="/auth" element={<Connexion />} />
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </div>
  );
};

export default index;
