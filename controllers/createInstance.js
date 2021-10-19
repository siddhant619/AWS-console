const getCreateInstanceForm = (req, res) => {
  res.render("createInstance.ejs");
};

const createNewInstance = (req, res) => {};

module.exports = { getCreateInstanceForm, createNewInstance };
