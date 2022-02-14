import React from "react";
import axios from "axios";

const SignUpForm = () => {
  return (
    <div>
      Inscription
      <form>
        <input type="text" email="email" id="email" required />
        <input type="text" name="name" id="name" required />
        <input type="text" surname="surname" id="surname" required />
        <input type="text" password="password" id="password" required />
      </form>
    </div>
  );
};

export default SignUpForm;
