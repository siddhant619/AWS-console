const {
  DescribeVpcsCommand,
  DescribeInstancesCommand,
} = require("@aws-sdk/client-ec2");
const { ec2Client } = require("../libs/ec2Client");

const getVPCs = async () => {
  const params = {};
  try {
    const response = await ec2Client.send(new DescribeVpcsCommand(params));
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
      ],
    };

    const data = defaultResponse.Vpcs.map((vpc) => {
      const vpcName = vpc.Tags?.[0].Value || "-";
      return { name: vpcName, id: vpc.VpcId, cidr: vpc.CidrBlock };
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
    console.log(typeof response, JSON.stringify(response));
    const instances = response.Reservations.Instances;
    const data = instances.map((instance) => {
      const instanceName = instance.Tags?.[0].Value || "-";
      return {
        name: instanceName,
        id: instance.InstanceId,
        state: instance.State.Name,
        keyName: instance.KeyName,
      };
    });

    return { data };
  } catch (err) {
    console.log("Oh no!!!.. Error from instances %j");
    return { data: [], error: err.message };
  }
};

const describeVPCandInstances = async (req, res) => {
  const vpc = await getVPCs();
  const instances = await getInstances();
  //console.log(instances);
  //res.send("hello fm vpc");
  res.render("index.ejs", { vpc, instances });
};

module.exports = { describeVPCandInstances };
