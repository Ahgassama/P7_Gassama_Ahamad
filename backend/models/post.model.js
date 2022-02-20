const connection = require("../config/db");
require("dotenv").config();

const Post = function (post) {
  this.message = post.message ?? "";
  this.image = post.image ?? "";
  this.user_userid = post.user_id;
};
Post.create = (newPost, callback) => {
  connection.query(
    `INSERT INTO  Posts (message, 
  image, user_userid) VALUES (?, ?, ?)`,
    [newPost.message, newPost.image, newPost.user_userid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(err, null);
        return;
      }
      console.log("created post: ", { id: res.insertId, ...newPost });
      callback(null, { id: res.insertId, ...newPost });
    }
  );
};

Post.findById = (id, result) => {
  connection.query(`SELECT * FROM Posts WHERE idPost = ?`, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};
Post.getAll = (message, result) => {
  let query = "SELECT message, image, user_userid FROM Posts";
  if (message) {
    query += ` WHERE message LIKE '%${message}%'`;
  }
  connection.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Posts: ", res);
    result(null, res);
  });
};
Post.updateById = (id, post, result) => {
  connection.query(
    "UPDATE Posts SET message = ?, image = ? WHERE idPost = ?",
    [post.message, post.image, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};
Post.remove = (id, result) => {
  connection.query("DELETE FROM Posts WHERE idPost = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Post with id: ", id);
    result(null, res);
  });
};

module.exports = Post;
