const {
  StartInstancesCommand,
  StopInstancesCommand,
} = require("@aws-sdk/client-ec2");
const { ec2Client } = require("../libs/ec2Client");
const axios = require("axios");
const startStopInstance = async (req, res) => {
  const body = { instanceID: req.body.id, action: req.body.state };
  try {
    const { data } = await axios.post(
      "https://2n9p2tsx33.execute-api.us-east-1.amazonaws.com/dev/startstopinstance",
      body
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
module.exports = { startStopInstance };
