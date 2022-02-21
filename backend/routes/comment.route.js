const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment.controller");

router.post("/", auth, commentCtrl.create);
router.get("/:id", auth, commentCtrl.findOne);
router.get("/post/:idPost", auth, commentCtrl.findAll);
router.put("/:id", auth, commentCtrl.update);
router.delete("/:id", auth, commentCtrl.delete);
module.exports = router;
