const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/*exports.signup = (req, res, next) => {
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
*/
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a User
  const User = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    isAdmin: false,
    password: hash,
  });

  // Save User in the database
  User.create(User, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};
