const bcrypt = require("bcrypt");
const connection = require("../config/db");
require("dotenv").config();
//const jwt = require("jsonwebtoken");
//const User = require("../models/user.model");

/*connection.query("SELECT * FROM `Users`", function (err, results, fields) {
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
  console.log("DB connected");
});*/
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        isAdmin: false,
        password: hash,
      };

      connection
        .query("INSERT INTO `Users` SET ?", user, err, result)
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) =>
          res
            .status(400)
            .json({ error, message: "L'e-mail indiqué est déjà existant" })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

/*exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a User
  const user = User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.surname,
    password: req.body.password,
  });

  // Save User in the database
  User.save(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};
*/
