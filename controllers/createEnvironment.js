const { cidrValidation } = require("../validation/cidr.js");
const axios = require("axios");

const getCreateEnvironmentForm = (req, res) => {
  res.render("createEnvironment.ejs");
};

const createNewEnvironment = async (req, res) => {
  const { stackName, vpcName, vpcCIDR, publicSubnetCIDR, privateSubnetCIDR } =
    req.body;
  const validationObj = cidrValidation(
    vpcCIDR,
    publicSubnetCIDR,
    privateSubnetCIDR
  );
  if (!validationObj.isValid)
    return res.status(400).json({ errorMessage: validationObj.message });
  try {
    const { data } = await axios.post(
      "https://2n9p2tsx33.execute-api.us-east-1.amazonaws.com/dev/createenvironment",
      { stackName, vpcName, vpcCIDR, publicSubnetCIDR, privateSubnetCIDR }
    );

    if (data.success === "true")
      return res.status(200).json({ data: data.data });
    else return res.status(400).json({ errorMessage: data.message });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ errorMessage: "Error: " + e.response.data.message });
  }
};
module.exports = { getCreateEnvironmentForm, createNewEnvironment };
