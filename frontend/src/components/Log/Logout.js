import React from "react";

const Logout = () => {
  const handleLogout = (e) => {
    e.preventDefault();
    if (!window.confirm(`Voulez-vous vraiment vous déconnecter`)) return;
    window.location = "/auth";
    localStorage.clear();
  };
  return (
    <form onSubmit={handleLogout}>
      <input type="image" id="image" alt="Logout" src="./images/logout.png" />
    </form>
  );
};

export default Logout;
