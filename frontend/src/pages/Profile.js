import React from "react";
import DisplayProfile from "../components/Profil/Edit";
import HeaderProfile from "../components/Header/HeaderProfile";
const Profile = () => {
  return (
    <div>
      <div>
        <HeaderProfile />
      </div>
      <DisplayProfile />
    </div>
  );
};
export default Profile;
