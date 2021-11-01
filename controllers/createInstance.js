const {
  DescribeKeyPairsCommand,
  DescribeSubnetsCommand,
  DescribeSecurityGroupsCommand,
} = require("@aws-sdk/client-ec2");
const { dummysubnets, dummysgs, dummykeyNames } = require("../dummyData");
const { ec2Client } = require("../libs/ec2Client");
const axios = require("axios");
const getKeyNames = async () => {
  try {
    const response = await ec2Client.send(new DescribeKeyPairsCommand({}));
    //console.log("Keypairs! ", response.KeyPairs);
    const data = response.KeyPairs.map((keypair) => {
      return keypair.KeyName;
    });
    return { data };
  } catch (err) {
    console.log("Oh no!!!.. Error from keynames ");
    return { data: [], error: err.message };
  }
};

const getSubnets = async () => {
  try {
    const response = await ec2Client.send(new DescribeSubnetsCommand({})); //check maxResults parameter
    const data = response.Subnets.map((subnet) => {
      return {
        id: subnet.SubnetId,
        az: subnet.AvailabilityZone,
        vpcId: subnet.VpcId,
      };
    });
    return { data };
  } catch (err) {
    console.log("Oh no!!!.. Error from subnets ");
    return { data: [], error: err.message };
  }
};

const getSecurityGroups = async () => {
  try {
    const response = await ec2Client.send(
      new DescribeSecurityGroupsCommand({})
    ); //check maxResults parameter
    const data = response.SecurityGroups.map((group) => {
      return { id: group.GroupId, description: group.Description };
    });
    return { data };
  } catch (err) {
    console.log("Oh no!!!.. Error from subnets ");
    return { data: [], error: err.message };
  }
};

const getCreateInstanceForm = async (req, res) => {
  const keyNames = await getKeyNames();
  const subnets = await getSubnets();
  const securityGroups = await getSecurityGroups();
  res.render("createInstance.ejs", { keyNames, subnets, securityGroups });
};
const isValid = (instanceName) => {
  if (!instanceName) return false;
  return true;
};
const isSgsValid = (selectedSecurityGroups) => {
  if (selectedSecurityGroups.length > 5) return false;
  return true;
};
const createNewInstance = async (req, res) => {
  try {
    const { instanceName, keyName, subnet, selectedSecurityGroups } = req.body;
    if (!isValid(instanceName))
      return res
        .status(400)
        .json({ errorMessage: "Please specify instance name!" });
    if (!isSgsValid(selectedSecurityGroups))
      return res
        .status(400)
        .json({ errorMessage: "Upto 5 security groups allowed!" });
    const { data } = await axios.post(
      "https://26rwihrqol.execute-api.us-east-1.amazonaws.com/dev/create-instance",
      {
        name: instanceName,
        keyName: keyName,
        securityGroupIds: selectedSecurityGroups,
        subnetId: subnet,
      }
    );
    if (data.success === "true")
      return res.status(200).json({ data: data.data });
    else return res.status(400).json({ errorMessage: data.message });
  } catch (e) {
    console.log("error while creating instance ", e);
    res.status(400).send("error while creating instance");
  }
};

module.exports = { getCreateInstanceForm, createNewInstance };
