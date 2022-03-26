require("dotenv").config();
const Comment = require("../models/comment.model");

exports.create = (req, res, next) => {
  console.log("hello", req.body);
  const commentReq = req.body;

  const comment = new Comment({
    message: commentReq.message,
    user_id: req.auth.userId,
    post_idPost: commentReq.post_idPost,
  });

  Comment.create(comment, (err, response) => {
    if (err) {
      return res.status(400).json({ err });
    }
    Comment.findById(response.id, (error, data) => {
      if (error) {
        if (error.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Post",
          });
        }
      }
      return res
        .status(201)
        .json({ message: "Objet enregistré !", comment: data });
    });
  });
};

exports.findOne = (req, res) => {
  Comment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Post with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Post with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
exports.findAll = (req, res) => {
  Comment.getAll(req.params.idPost, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    else res.send(data);
  });
};
//Non utilisé
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  Comment.updateById(req.params.id, new Comment(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Comment with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Comment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Comment with id " + req.params.id,
        });
      }
    } else res.send({ message: `Comment was deleted successfully!` });
  });
};
