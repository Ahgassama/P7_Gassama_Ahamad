const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/", auth, multer, postCtrl.create);
router.get("/:id", auth, multer, postCtrl.findOne);
router.put("/:id", auth, multer, postCtrl.update);
router.delete("/:id", auth, multer, postCtrl.delete);
module.exports = router;
