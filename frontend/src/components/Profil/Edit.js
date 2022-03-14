import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Edit.scss";

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
    <div className="form-profil">
      <div className="profil-container">
        <form action="" id="profil-form">
          <label htmlFor="name">Nom</label>
          <br />
          <input type="text" name="name" id="name" placeholder={data.name} />

          <br />
          <label htmlFor="surname">Prénom</label>
          <br />
          <input
            type="text"
            name="surname"
            id="surname"
            placeholder={data.surname}
          />

          <br />
          <input type="submit" value="Désactiver mon compte" />
        </form>
      </div>
    </div>
  );
}
export default DisplayProfile;
