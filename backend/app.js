const express = require("express");
const app = express();
const helmet = require("helmet");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const commentRoutes = require("./routes/comment.route");
console.log(userRoutes);
app.use(helmet());
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
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
module.exports = app;
