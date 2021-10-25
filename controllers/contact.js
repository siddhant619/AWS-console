const axios = require("axios");
const getContactForm = (req, res) => {
  console.log(req.body);
  res.render("contact.ejs");
};
const sendContactForm = async (req, res) => {
  //console.log(req.body);
  const body = { query: req.body.query.trim() };
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
