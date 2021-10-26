const { cirdValidation } = require("../validation/cidr.js");
const axios = require("axios");

const getCreateEnvironmentForm = (req, res) => {
  res.render("createEnvironment.ejs");
};

const createNewEnvironment = async (req, res) => {
  const { stackName, vpcName, vpcCIDR, publicSubnetCIDR, privateSubnetCIDR } =
    req.body;
  const body = {};
  if (!cirdValidation(vpcCIDR, publicSubnetCIDR, privateSubnetCIDR)) {
    console.log("invalid");
    return res.json({ errorMessage: "Incorrect CIDR IPs" });
  } else {
    console.log("valid!!");
    return res.json({ errorMessage: "Valid inputs" });
  }
  try {
    const response = await axios.post(
      "https://26rwihrqol.execute-api.us-east-1.amazonaws.com/dev/createenvironment",
      { stackName, vpcName, vpcCIDR, publicSubnetCIDR, privateSubnetCIDR }
    );
    console.log(response);
    return res.json(response.data);
  } catch (e) {
    console.log("oh no", e);
    return res.json({ statusCode: 400, body: e });
  }
};
module.exports = { getCreateEnvironmentForm, createNewEnvironment };
