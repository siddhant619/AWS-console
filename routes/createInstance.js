const express = require("express");
const router = express.Router();

const {
  getCreateInstanceForm,
  createNewInstance,
} = require("../controllers/createInstance");

router.route("/").get(getCreateInstanceForm).post(createNewInstance);

module.exports = router;
