import React, { useState } from "react";
import axios from "axios";
const SignupForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    const nameError = document.querySelector(".name-error");
    const surnameError = document.querySelector(".surname-error");
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:3000/api/user/login`,
      withCredentials: true,
      data: {
        name,
        surname,
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          nameError.innerHTML = res.data.errors.name;
          surnameError.innerHTML = res.data.errors.surname;
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form action="" onSubmit={handleLogin} id="login-form">
        <label htmlFor="name">Nom</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <div className="name-error"></div>
        <br />
        <label htmlFor="surname">Prénom</label>
        <br />
        <input
          type="text"
          name="surname"
          id="surname"
          onChange={(e) => setSurname(e.target.value)}
          value={surname}
          required
        />
        <div className="surname-error"></div>
        <br />
        <label htmlFor="email">E-mail</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <div className="email-error"></div>
        <br />
        <label htmlFor="text">Mot de passe</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <div className="password-error"></div>
        <br />
        <input type="submit" value="S'inscrire" />
      </form>
    </div>
  );
};

export default SignupForm;
