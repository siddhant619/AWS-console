const express = require("express");
const router = express.Router();

const { startStopInstance } = require("../controllers/startStopInstance");

router.route("/").post(startStopInstance);

module.exports = router;
