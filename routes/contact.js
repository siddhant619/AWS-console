const express = require("express");
const router = express.Router();

const { getContactForm, sendContactForm } = require("../controllers/contact");

router.route("/").get(getContactForm).post(sendContactForm);

module.exports = router;
