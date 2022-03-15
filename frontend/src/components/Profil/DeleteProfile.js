import React from "react";
import axios from "axios";

const DeleteProfile = () => {
  const handledeleteProfile = (e) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer votre profil ?`))
      return;

    const user = JSON.parse(localStorage.getItem("Users"));
    const id = JSON.parse(localStorage.getItem("Users")).userid;
    console.log(id);
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    };

    e.preventDefault();
    axios
      .delete(`http://localhost:3000/api/user/${id}`, config)
      .then((res) => {
        if (res.data.errors) {
          console.log("pas d'utilisateur");
        } else {
          window.location = "/auth";
          localStorage.clear("Users");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <input
      type="submit"
      onClick={handledeleteProfile}
      value="Désactiver le compte"
    />
  );
};
export default DeleteProfile;
