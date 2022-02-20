require("dotenv").config();
const Comment = require("../models/comment.model");
const { report } = require("../routes/user.route");
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
    return res.status(201).json({ message: "Objet enregistré !" });
  });
};
