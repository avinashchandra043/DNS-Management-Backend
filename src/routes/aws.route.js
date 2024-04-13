const express = require("express");
const router = express.Router();
const awsController = require("../controller/aws.controller");
const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, awsController.registerAws);

module.exports = router;
