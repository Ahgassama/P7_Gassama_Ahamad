require("dotenv").config();
const Post = require("../models/post.model");
const fs = require("fs");

exports.create = (req, res, next) => {
  console.log("hello", req.body);
  const postReq = req.body;
  const post = new Post({
    message: postReq.message,
    user_id: req.auth.userId,
  });

  if (req.file) {
    post.image = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  Post.create(post, (err, response) => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.status(201).json({ message: "Objet enregistré !" });
  });
};
exports.findOne = (req, res) => {
  Post.findById(req.params.id, (err, data) => {
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
  const message = req.query.message;
  Post.getAll(message, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Posts.",
      });
    else res.send(data);
  });
};
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  Post.updateById(req.params.id, new Post(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Post with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Post with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
exports.delete = (req, res) => {
  Post.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Post with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Post with id " + req.params.id,
        });
      }
    } else res.send({ message: `Post was deleted successfully!` });
  });
};
