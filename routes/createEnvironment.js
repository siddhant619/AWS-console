const express = require("express");
const router = express.Router();

const {
  getCreateEnvironmentForm,
  createNewEnvironment,
} = require("../controllers/createEnvironment");

router.route("/").get(getCreateEnvironmentForm).post(createNewEnvironment);

module.exports = router;
