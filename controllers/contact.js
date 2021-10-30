const axios = require("axios");
const { isPhoneValid } = require("../validation/contact.js");

const getContactForm = (req, res) => {
  res.render("contact.ejs");
};

const sendContactForm = async (req, res) => {
  const body = {
    query: req.body.query.trim(),
    email: req.body.email,
    phone: req.body.phone,
  };
  if (!isPhoneValid(req.body.phone))
    return res
      .status(400)
      .json({ errorMessage: "Please enter 10 digit phone no." });
  if (req.body.query.trim() === "")
    return res.status(400).json({ errorMessage: "Please enter your query" });
  try {
    const { data } = await axios.post(
      "https://26rwihrqol.execute-api.us-east-1.amazonaws.com/dev/contact",
      body
    );
    if (data.success === "true")
      return res.status(200).json({ data: data.data });
    else return res.status(400).json({ errorMessage: data.message });
  } catch (e) {
    //console.log(e);
    return res
      .status(400)
      .json({ errorMessage: "Error: " + e.response.data.message });
  }
  res.send("hi from sendContactForm");
};
module.exports = { getContactForm, sendContactForm };
