const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        isAdmin: false,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) =>
          res
            .status(400)
            .json({ error, message: "L'e-mail indiqué est déjà existant" })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};
