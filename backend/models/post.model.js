const connection = require("../config/db");
require("dotenv").config();

const Post = function (post) {
  this.message = post.message;
};
Post.create = (newPost, result) => {
  connection.query("INSERT INTO Posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created post: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};

module.exports = Post;
