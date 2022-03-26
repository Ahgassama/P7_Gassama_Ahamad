import React from "react";
//fonction de déconnexion de l'utilisateur
const Logout = () => {
  const handleLogout = (e) => {
    e.preventDefault();
    if (!window.confirm(`Voulez-vous vraiment vous déconnecter`)) return;
    window.location = "/auth";
    localStorage.clear();
  };
  return (
    <form onSubmit={handleLogout}>
      <input
        type="image"
        id="image-log"
        alt="Logout"
        src="./images/logout.png"
      />
    </form>
  );
};

export default Logout;
