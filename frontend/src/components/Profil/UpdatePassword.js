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
  console.log(id);

  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const handleModPassword = (e) => {
    console.log(password);
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/user/${id}`, { password }, config)
      .then((res) => {
        if (res.data.errors) {
          console.log("erreur de mot de passe");
        } else {
          console.log(res);
          //document.location.reload();
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
        className="post-form"
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
        <input id="post-input" type="submit" value="Confirmer" />
      </form>
    </div>
  );
};

export default UpdatePassword;
