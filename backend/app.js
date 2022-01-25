const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Groupomania",
  password: "novembre",
});
connection.query("SELECT * FROM `Post`", function (err, results, fields) {
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
});

module.exports = app;
