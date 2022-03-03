/*import React, { useState, useEffect } from "react";

import axios from "axios";
import "./Edit.scss";
const FormProfil = () => {
  const [surname, setSurName] = useState("");
  const user = JSON.parse(localStorage.getItem("Users"));
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };
  const id = JSON.parse(localStorage.getItem("userid"));
  console.log(id);
  axios.get(`http://localhost:3000/api/user/${id}`, config).then((res) => {
    if (res.data.errors) {
      console.log(res);
    } else {
      console.log(res);
    }
  });
  return (
    <form className="form-profil">
      <label htmlFor="nom">Nom</label>
      <input
        className="profil-input"
        type="text"
        name="nom"
        id="surname"
        placeholder={surname}
        onChange={(e) => setSurName(e.target.value)}
      />
    </form>
  );
};
export default FormProfil;*/

import React, { useEffect, useState } from "react";
import axios from "axios";

function DisplayProfile() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("Users"));
  console.log(JSON.parse(localStorage.getItem("Users")).userid);
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:3000/api/user/${
          JSON.parse(localStorage.getItem("Users")).userid
        }`,
        config
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <form className="form-profil">
      <label htmlFor="nom">Nom</label>
      <input
        className="profil-input"
        type="text"
        name="nom"
        id="surname"
        placeholder={data.name}
      />
      <br />
      <label htmlFor="nom">Prénom</label>
      <input
        className="profil-input"
        type="text"
        name="nom"
        id="surname"
        placeholder={data.surname}
      />
    </form>
  );
}
export default DisplayProfile;
