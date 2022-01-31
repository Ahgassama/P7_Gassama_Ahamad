const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");

router.post("/", userCtrl.create);
module.exports = router;
