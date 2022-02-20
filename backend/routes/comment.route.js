const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment.controller");

router.post("/", auth, commentCtrl.create);
module.exports = router;
