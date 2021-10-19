const {
  StartInstancesCommand,
  StopInstancesCommand,
} = require("@aws-sdk/client-ec2");
const { ec2Client } = require("../libs/ec2Client");

const startStopInstance = async (req, res) => {
  console.log(req.body);
  const params = { InstanceIds: [req.body.id] }; // Array of INSTANCE_IDs
  if (req.body.state === "start") {
    try {
      const data = await ec2Client.send(new StartInstancesCommand(params));
      console.log("Success", data.StartingInstances);
      return res.status(200).json({ data });
    } catch (err) {
      console.log("Oh no.. if error", err);
      return res.status(400).json({ data: err });
    }
  } else {
    try {
      const data = await ec2Client.send(new StopInstancesCommand(params));
      console.log("Success", data.StoppingInstances);
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(400).json({ data: err });
    }
  }
  //res.send("hello frm startStopInstance" + req.body);
};
module.exports = { startStopInstance };
