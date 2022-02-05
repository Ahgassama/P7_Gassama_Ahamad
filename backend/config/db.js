const mysql = require("mysql2");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  database: process.env.DATABASE,
  password: process.env.DBPASSWORD,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

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
/*const User = function (User) {
  this.name = User.name;
  this.surname = User.surname;
  this.email = User.email;
  this.isAdmin = User.isAdmin;
  this.password = User.password;
};
connection.query("INSERT INTO `Users` SET ?", User, (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
  console.log("created Users: ", { id: res.insertId, ...User });
  result(null, { id: res.insertId, ...newUser });
});*/

module.exports = connection;
