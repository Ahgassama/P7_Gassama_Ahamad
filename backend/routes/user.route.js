const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");

router.post("/signup", userCtrl.create);
router.post("/login", userCtrl.login);
router.delete("/:id", userCtrl.delete);
router.put("/:id", userCtrl.update);
router.get(":/id", userCtrl.findOne);
module.exports = router;
