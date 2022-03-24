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
    const signupIdentityError = "Merci de transmettre des données valide";
    const logError =
      "Merci de transmettre un e-mail et/ou un mot de passe valide";

    e.preventDefault();

    axios({
      method: "POST",
      url: `http://localhost:3000/api/user/signup`,
      data: {
        name,
        surname,
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
        } else {
          alert(
            "Votre compte est désormais bien créé! Merci de vous connecter pour intéragir avec vos collègues"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        emailError.innerHTML = logError;
        passwordError.innerHTML = logError;
        nameError.innerHTML = signupIdentityError;
        surnameError.innerHTML = signupIdentityError;
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
