import React, { useState } from "react";
import axios from "axios";
//fonction de modification du mdp
const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };
  const user = JSON.parse(localStorage.getItem("Users"));
  const id = JSON.parse(localStorage.getItem("Users")).userid;

  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  function passwordControl(password) {
    if (/^(?=.*[A-Za-z])(\d)[A-Za-z\d]{8,}$/.test(password)) {
      return true;
    } else {
      const errorMsg =
        "Le mot de passe doit contenir au minimum 8 caractères dont un chiffre et une majuscule";
      const displayError = document.querySelector(".password-error");
      displayError.innerHTML = errorMsg;
      return false;
    }
  }

  const handleModPassword = (e) => {
    e.preventDefault();
    if (!window.confirm(`Confimez vous modifier votre mot de passe?`)) return;
    if (passwordControl(password)) {
      axios({
        method: "PUT",
        url: `http://localhost:3000/api/user/${id}`,
        data: {
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            console.log("erreur de mot de passe");
          } else {
            console.log(res);
            alert("Votre mot de passe a bien été modifié");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  return (
    <div>
      <form
        action=""
        encType="multipart/form-data"
        onSubmit={handleModPassword}
        className="password-form"
      >
        <input
          name="password"
          id="password"
          onChange={onPasswordChange}
          value={password}
          placeholder="Entrer votre nouveau mot de passe"
        />

        <br />
        <div className="password-error"></div>
        <br />
        <input id="modify-input" type="submit" value="Confirmer" />
      </form>
    </div>
  );
};

export default UpdatePassword;
