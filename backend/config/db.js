const mysql = require("mysql2");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  database: process.env.DATABASE,
  password: process.env.DBPASSWORD,
});
connection.query("SELECT * FROM `Users`", function (err, results, fields) {
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
  console.log("DB connected");
});

module.exports = connection;
