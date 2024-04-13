const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authenticate = require("../middleware/authenticate");

router.get("/profile", authenticate, userController.getUserProfile);

module.exports = router;
