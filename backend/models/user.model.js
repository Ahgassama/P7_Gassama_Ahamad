const connection = require("../config/db");
require("dotenv").config();
//const sql = require("../config/db");

// constructor

const User = function (user) {
  this.name = user.name;
  this.surname = user.surname;
  this.email = user.email;
  this.isAdmin = user.isAdmin;
  this.password = user.password;
};
User.create = (newUser, result) => {
  connection.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Users: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getByEmail = (result) => {
  connection.query("SELECT * FROM Users WHERE email=?", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

module.exports = User;
