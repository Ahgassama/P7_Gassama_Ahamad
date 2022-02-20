require("dotenv").config();
const connection = require("../config/db");
const Comment = function (comment) {
  this.message = comment.message ?? "";
  this.user_userid = comment.user_id;
  this.post_idPost = comment.idPost;
};
Comment.create = (newComment, callback) => {
  connection.query(
    `INSERT INTO  Comments (message,user_userid,post_idPost) VALUES (?, ?,?)`,
    [newComment.message, newComment.user_userid, newComment.idPost],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(err, null);
        return;
      }
      console.log("created Comment: ", { id: res.insertId, ...newComment });
      callback(null, { id: res.insertId, ...newComment });
    }
  );
};

module.exports = Comment;
