import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteProfile from "./DeleteProfile";
import UpdatePassword from "./UpdatePassword";
import "./Edit.scss";

function DisplayProfile() {
  const [updateModal, setUpdate] = useState(false);
  const handleModals = (e) => {
    if (e.target.id === "password") {
      setUpdate(true);
    }
  };
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
      console.log(result.data);
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
          <label htmlFor="email">E-mail</label>
          <br />
          <input type="text" name="email" id="email" placeholder={data.email} />

          <br />
          <DeleteProfile />

          <br />
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Modifier mon mot de passe"
            onClick={handleModals}
          />
          {updateModal && <UpdatePassword />}
        </form>
      </div>
    </div>
  );
}
export default DisplayProfile;
