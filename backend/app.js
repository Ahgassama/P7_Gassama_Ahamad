const express = require("express");
////const mysql = require("mysql2");
const app = express();
const userRoutes = require("./routes/user.route");
console.log(userRoutes);
//require("dotenv").config();
//require();
//console.log(process.env);
/*app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});*/
/*const connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  database: process.env.DATABASE,
  password: process.env.DBPASSWORD,
});
connection.query("SELECT * FROM `Users`", function (err, results, fields) {
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
});*/
//app.get("/", res.status(200));
app.use(express.json());
app.use("/api/user", userRoutes);
module.exports = app;
