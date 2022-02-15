import React, { useState } from "react";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
const Log = () => {
  const [signUpModal, setSignupModal] = useState(true);
  const [loginModal, setloginModal] = useState(false);
  const handleModals = (e) => {
    if (e.target.id === "register") {
      setloginModal(false);
      setSignupModal(true);
    } else if (e.target.id === "login") {
      setSignupModal(false);
      setloginModal(true);
    }
  };
  return (
    <div class="log-container">
      <div class="connection-form">
        <ul>
          <li onClick={handleModals} id="register">
            Inscription
          </li>
          <li onClick={handleModals} id="login">
            Connexion
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {loginModal && <LoginForm />}
      </div>
    </div>
  );
};

export default Log;
