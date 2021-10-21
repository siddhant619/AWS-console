const {
  StartInstancesCommand,
  StopInstancesCommand,
} = require("@aws-sdk/client-ec2");
const { ec2Client } = require("../libs/ec2Client");
const axios = require("axios");
const startStopInstance = async (req, res) => {
  console.log(req.body);
  //const params = { InstanceIds: [req.body.id] }; // Array of INSTANCE_IDs
  const body = { instanceID: req.body.id, action: req.body.state };
  try {
    const response = await axios.post(
      "https://26rwihrqol.execute-api.us-east-1.amazonaws.com/dev/startstopinstance",
      body
    );
    console.log(response, "start/stop action done");
    return res.status(200).json(response.data);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Some error occured!");
  }
  //res.send("hello frm startStopInstance" + req.body);
};
module.exports = { startStopInstance };
