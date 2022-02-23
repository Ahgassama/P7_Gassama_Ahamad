import React, { useState } from "react";
import axios from "axios";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    const emailError = document.querySelector(".emailerror");
    const passwordError = document.querySelector(".passworderror");
    const logError =
      "Merci de transmettre un e-mail et/ou un mot de passe valide";
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:3000/api/user/login`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = logError;
          passwordError.innerHTML = res.data.errors;
        } else {
          window.location = "/";
          localStorage.setItem("user", JSON.stringify(res.data));
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
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
        <div className="emailerror"></div>
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
        <div className="passworderror"></div>
        <br />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default LoginForm;
