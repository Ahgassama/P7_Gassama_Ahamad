const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const checkEmail = require("../middleware/check-email");

router.post("/signup", checkEmail, userCtrl.create);
router.post("/login", userCtrl.login);
router.delete("/:id", userCtrl.delete);
router.put("/:id", userCtrl.update);
router.get("/", userCtrl.findAll);
router.get("/:id", userCtrl.findOne);
module.exports = router;
