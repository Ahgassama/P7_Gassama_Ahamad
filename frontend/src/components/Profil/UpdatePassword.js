import React, { useState } from "react";
import axios from "axios";

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

  const handleModPassword = (e) => {
    console.log(password);
    console.log(id);
    e.preventDefault();

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

        <br />
        <input id="modify-input" type="submit" value="Confirmer" />
      </form>
    </div>
  );
};

export default UpdatePassword;
