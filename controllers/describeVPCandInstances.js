const {
  DescribeVpcsCommand,
  DescribeInstancesCommand,
  DescribeSubnetsCommand,
} = require("@aws-sdk/client-ec2");
const { ec2Client } = require("../libs/ec2Client");
const axios = require("axios");

const getVPCs = async () => {
  const params = {};
  try {
    const response = await ec2Client.send(new DescribeVpcsCommand(params));
    const subnets = await ec2Client.send(new DescribeSubnetsCommand({}));
    const defaultResponse = {
      Vpcs: [
        {
          CidrBlock: "10.0.0.0/24",
          DhcpOptionsId: "dopt-00c5fd7a",
          State: "available",
          VpcId: "vpc-0b3a6af15277cb800",
          OwnerId: "292242767239",
          InstanceTenancy: "default",
          CidrBlockAssociationSet: [
            {
              AssociationId: "vpc-cidr-assoc-0e13f4b8f6ac06463",
              CidrBlock: "10.0.0.0/24",
              CidrBlockState: {
                State: "associated",
              },
            },
          ],
          IsDefault: false,
          Tags: [
            {
              Key: "Name",
              Value: "demovpc",
            },
          ],
        },
        {
          CidrBlock: "172.31.0.0/16",
          DhcpOptionsId: "dopt-00c5fd7a",
          State: "available",
          VpcId: "vpc-067ce37b",
          OwnerId: "292242767239",
          InstanceTenancy: "default",
          CidrBlockAssociationSet: [
            {
              AssociationId: "vpc-cidr-assoc-04d1b96b",
              CidrBlock: "172.31.0.0/16",
              CidrBlockState: {
                State: "associated",
              },
            },
          ],
          IsDefault: true,
        },
        {
          CidrBlock: "10.0.0.0/24",
          DhcpOptionsId: "dopt-00c5fd7a",
          State: "available",
          VpcId: "vpc-0b3a6af15277cb800",
          OwnerId: "292242767239",
          InstanceTenancy: "default",
          CidrBlockAssociationSet: [
            {
              AssociationId: "vpc-cidr-assoc-0e13f4b8f6ac06463",
              CidrBlock: "10.0.0.0/24",
              CidrBlockState: {
                State: "associated",
              },
            },
          ],
          IsDefault: false,
          Tags: [
            {
              Key: "aws:cloudformation:stack-id	",
              Value:
                "arn:aws:cloudformation:us-east-1:292242767239:stack/setupEnv1/9eeb3540-397e-11ec-812a-0a73ca923921",
            },
            {
              Key: "Name",
              Value: "demovpc",
            },
          ],
        },
      ],
    };
    let count = {};
    subnets.Subnets.forEach((subnet) => {
      console.log(subnet.VpcId);
      count[subnet.VpcId] = count[subnet.VpcId] ? count[subnet.VpcId] + 1 : 1;
    });
    console.log(count);
    const data = response.Vpcs.map((vpc) => {
      let vpcName = "-";
      const tags = vpc.Tags;
      tags?.forEach((tag) => {
        if (tag.Key === "Name") vpcName = tag.Value;
      });

      return {
        name: vpcName,
        id: vpc.VpcId,
        cidr: vpc.CidrBlock,
        subnets: count[vpc.VpcId] || 0,
        isDefault: vpc.IsDefault,
      };
    });
    return { data };
  } catch (err) {
    console.log("Oh no!!!.. Error from vpcs %j");
    return { data: [], error: err.message };
  }
};

const getInstances = async () => {
  try {
    const response = await ec2Client.send(new DescribeInstancesCommand({}));
    const reservations = response.Reservations;
    let instances = [];
    reservations.forEach((reservation) => {
      reservation.Instances.forEach((instance) => {
        instances.push(instance);
      });
    });
    const data = instances.map((instance) => {
      const instanceName = instance.Tags?.[0].Value || "-";
      return {
        name: instanceName,
        id: instance.InstanceId,
        state: instance.State.Name,
        keyName: instance.KeyName,
        launchTime: instance.LaunchTime,
      };
    });
    const dummyData = [
      {
        name: "demoEC2",
        id: "i-0e8a1e9177b70ebea",
        state: "stopped",
        keyName: "siddhant-linux",
      },
      {
        name: "ec1",
        id: "i-0e8a1e9177b70ebea",
        state: "stopped",
        keyName: "siddhant-linux",
      },
      {
        name: "ec2test",
        id: "i-0e8a1e9177b70ebea",
        state: "stopped",
        keyName: "siddhant-linux",
      },
    ];
    return { data };
  } catch (err) {
    console.log("Oh no!!!.. Error from instances %j");
    return { data: [], error: err.message };
  }
};

const describeVPCandInstances = async (req, res) => {
  const vpc = await getVPCs();
  const instances = await getInstances();
  res.render("index.ejs", { vpc, instances });
};

module.exports = { describeVPCandInstances };
