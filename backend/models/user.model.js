const sql = require("../config/db");

// constructor

const User = function (User) {
  this.name = User.name;
  this.surname = User.surname;
  this.email = User.email;
  this.isAdmin = User.isAdmin;
  this.password = User.password;
};
User.create = (newUser, result) => {
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Users: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
module.exports = User;
