require("dotenv").config();
const connection = require("../config/db");
const Comment = function (comment) {
  this.message = comment.message ?? "";
  this.user_userid = comment.user_id;
  this.post_idPost = comment.post_idPost;
};
Comment.create = (newComment, callback) => {
  connection.query(
    `INSERT INTO  Comments (message,user_userid,post_idPost) VALUES (?, ?, ?)`,
    [newComment.message, newComment.user_userid, newComment.post_idPost],
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

Comment.findById = (id, result) => {
  connection.query(
    `SELECT c.idComment, c.post_idPost AS 'idPost', c.message,c.date, u.userid, u.name, u.surname FROM Comments c INNER JOIN Users u ON c.user_userid = u.userid  WHERE idComment = ?`,
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found comment: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found User with the id
      result({ kind: "not_found" }, null);
    }
  );
};
Comment.getAll = (idPost, result) => {
  let query = `SELECT * FROM Comments WHERE post_idPost =${idPost}`;

  connection.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Comments: ", res);
    result(null, res);
  });
};
Comment.findAll = (result) => {
  let query = `SELECT c.idComment, c.post_idPost AS 'idPost', c.message,c.date, u.userid, u.name, u.surname FROM Comments c INNER JOIN Users u ON c.user_userid = u.userid `;

  connection.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Comments: ", res);
    result(null, res);
  });
};
Comment.updateById = (id, comment, result) => {
  connection.query(
    "UPDATE Comments SET message = ? WHERE idComment = ?",
    [comment.message, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Comment with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated comment: ", { id: id, ...comment });
      result(null, { id: id, ...comment });
    }
  );
};
Comment.remove = (id, result) => {
  connection.query(
    "DELETE FROM  Comments WHERE idComment = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted Comment with id: ", id);
      result(null, res);
    }
  );
};
module.exports = Comment;
