
// Import required AWS SDK clients and commands for Node.js
//import { DescribeSecurityGroupsCommand } from "@aws-sdk/client-ec2";
const {DescribeSecurityGroupsCommand}= require("@aws-sdk/client-ec2")
//import { ec2Client } from "./libs/ec2Client";
const {ec2Client} =require('./libs/ec2Client')
// Set the parameters
const params = { }; //SECURITY_GROUP_ID

const run = async () => {
  try {
    const data = await ec2Client.send(
      new DescribeSecurityGroupsCommand(params)
    );
    console.log("Success...here's ur data: ", JSON.stringify(data.SecurityGroups));
    return data;
  } catch (err) {
    console.log("Oh no!!!.. Error", err);
    return err;
  }
};
console.log(run());

