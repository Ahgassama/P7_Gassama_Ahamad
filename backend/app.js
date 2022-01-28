const express = require("express");
const mysql = require("mysql2");
const app = express();
require("dotenv").config();
console.log(process.env);
app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});
const connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  database: process.env.DATABASE,
  password: process.env.DBPASSWORD,
});
connection.query("SELECT * FROM `Posts`", function (err, results, fields) {
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
});

module.exports = app;
