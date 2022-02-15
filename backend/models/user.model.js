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
  connection.query(
    "SELECT userid, password FROM Users WHERE email = ?",
    [email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Users: ", res);
      result(null, res);
    }
  );
};
User.findById = (id, result) => {
  connection.query(`SELECT * FROM Users WHERE userid = ${id}`, (err, res) => {
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
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
User.updateById = (id, user, result) => {
  connection.query(
    "UPDATE Users SET name = ?, surname = ? WHERE userid = ?",
    [user.name, user.surname, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  connection.query("DELETE FROM Users WHERE userid = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted User with id: ", id);
    result(null, res);
  });
};
module.exports = User;
