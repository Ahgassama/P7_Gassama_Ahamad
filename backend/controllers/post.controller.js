require("dotenv").config();
const Post = require("../models/post.model");

/*exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Tutorial
  const post = {
    message: req.body.message,
  };
  // Save Tutorial in the database
  Post.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User",
      });
    else res.send(data);
  });
};
*/
exports.create = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};
