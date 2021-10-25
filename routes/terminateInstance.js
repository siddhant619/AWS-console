const express = require("express");
const router = express.Router();

const { terminateInstance } = require("../controllers/terminateInstance");

router.route("/").post(terminateInstance);

module.exports = router;
