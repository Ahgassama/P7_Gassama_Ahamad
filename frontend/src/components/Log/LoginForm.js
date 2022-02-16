import React, { useState } from "react";
import axios from "axios";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:3000/api/user/login`,
      //withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
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
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default LoginForm;
