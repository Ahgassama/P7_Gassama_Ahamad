const bcrypt = require("bcrypt");
//const connection = require("../models/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a User
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      isAdmin: req.body.isAdmin || false,
      password: hash,
    };

    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      else res.send(data);
    });
  });
};

exports.login = (req, res, next) => {
  User.getByEmail({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
