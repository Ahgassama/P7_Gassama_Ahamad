import React, { useState } from "react";
import axios from "axios";
//Inscription d'un nouvel utilisateur
const SignupForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Controle du formulaire
  function NameControl() {
    const regexPrenomNom = (value) => {
      return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(
        value
      );
    };

    if (regexPrenomNom(name)) {
      return true;
    } else {
      const errorMsg = "Le nom n'est pas valide";
      const displayError = document.querySelector(".name-error");
      displayError.innerHTML = errorMsg;
      return false;
    }
  }
  function SurNameControl() {
    const regexPrenomNom = (value) => {
      return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(
        value
      );
    };

    if (regexPrenomNom(surname)) {
      return true;
    } else {
      const errorMsg = "le prénom n'est pas valide";
      const displayError = document.querySelector(".surname-Error");
      displayError.innerHTML = errorMsg;
      return false;
    }
  }
  function emailControl(email) {
    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
      return true;
    } else {
      const errorMsg = "L'email n'est pas valide";
      const displayError = document.querySelector(".email-error");
      displayError.innerHTML = errorMsg;
      return false;
    }
  }
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
  //Envoi des données à l'API pour la connexion
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      NameControl(name) &&
      SurNameControl(surname) &&
      emailControl(email) &&
      passwordControl(password)
    ) {
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
          alert("l'email est déjà utilisé par un autre utilisateur");
        });
    }
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
