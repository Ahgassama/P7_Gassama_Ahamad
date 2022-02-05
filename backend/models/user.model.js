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

User.login = (email, result) => {
  connection.query(`SELECT * FROM Users WHERE email = ${email}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = User;
