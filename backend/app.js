const express = require("express");
const app = express();
const helmet = require("helmet");
const path = require("path");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const commentRoutes = require("./routes/comment.route");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
module.exports = app;
