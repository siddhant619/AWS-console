const getContactForm = (req, res) => {
  console.log(req.body);
  res.render("contact.ejs");
};
const sendContactForm = (req, res) => {
  console.log(req.body);
  res.send("hi frm sendContactForm");
};
module.exports = { getContactForm, sendContactForm };
