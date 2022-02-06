const bcrypt = require("bcrypt");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const connection = require("../config/db");
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

/*exports.login = (req, res, next) => {
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
*/
/*exports.login = (req, res) => {
  User.findByName(req.body.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with email .`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email ",
        });
      }
    } else res.send(data);
  });
};
*/
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.login([email], function (err, result) {
    if (err) {
      return res.status(500).json(err.message);
    }
    if (result.length == 0) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
    bcrypt
      .compare(password, result[0].password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          }),
        });
      })
      .catch((e) => res.status(500).json(e));
  });
};
