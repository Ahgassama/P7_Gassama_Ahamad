const connection = require("../config/db");
require("dotenv").config();
//const sql = require("../config/db");

// constructor

const User = function (user) {
  this.name = user.name;
  this.surname = user.surname;
  this.email = user.email;
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
/*connection.query(
    "INSERT INTO Users SET ?",
    {
      name: "name",
      surname: "surname",
      email: "email",
      isAdmin: false,
    },
    function (error, results, fields) {
      if (error) throw error;
      console.log(results.insertId);
    }
  );*/

module.exports = User;
