
const {DescribeVpcsCommand }= require("@aws-sdk/client-ec2")
const {ec2Client} =require('../libs/ec2Client')

const describeVPCs = async () => {
    const params = { };
    try {
      const data = await ec2Client.send(
        new DescribeVpcsCommand(params)
      );
      //console.log("Success...here's ur VPCs: ", JSON.stringify(data.Vpcs));
      return data;
    } catch (err) {
      //console.log("Oh no!!!.. Error", err);
      return err;
    }
  };
const describeVPCandInstances= async (req,res)=>{
    const params = { };
    try {
        const response = await ec2Client.send(
          new DescribeVpcsCommand(params)
        );
        const defaultResponse=[
            {
               "CidrBlock":"10.0.0.0/24",
               "DhcpOptionsId":"dopt-00c5fd7a",
               "State":"available",
               "VpcId":"vpc-0b3a6af15277cb800",
               "OwnerId":"292242767239",
               "InstanceTenancy":"default",
               "CidrBlockAssociationSet":[
                  {
                     "AssociationId":"vpc-cidr-assoc-0e13f4b8f6ac06463",
                     "CidrBlock":"10.0.0.0/24",
                     "CidrBlockState":{
                        "State":"associated"
                     }
                  }
               ],
               "IsDefault":false,
               "Tags":[
                  {
                     "Key":"Name",
                     "Value":"demovpc"
                  }
               ]
            },
            {
               "CidrBlock":"172.31.0.0/16",
               "DhcpOptionsId":"dopt-00c5fd7a",
               "State":"available",
               "VpcId":"vpc-067ce37b",
               "OwnerId":"292242767239",
               "InstanceTenancy":"default",
               "CidrBlockAssociationSet":[
                  {
                     "AssociationId":"vpc-cidr-assoc-04d1b96b",
                     "CidrBlock":"172.31.0.0/16",
                     "CidrBlockState":{
                        "State":"associated"
                     }
                  }
               ],
               "IsDefault":true
            }
         ]
        //console.log("Success...here's ur VPCs: ", JSON.stringify(data.Vpcs));
        //res.render('index.ejs', {data.Vpcs});
        const data= response.Vpcs.map(vpc=>{
            const vpcName= vpc.Tags?.[0].Value || "-"
            return {name:vpcName, id: vpc.VpcId, cidr: vpc.CidrBlock}
        })
        res.render('index.ejs', {data});
      } catch (err) {
        console.log("Oh no!!!.. Error %j",err );
        
        console.log(err.type,err.message)
        //res.send(err.message)
        res.render('index.ejs', {data:[], error:err.message});
      }

}

module.exports= {describeVPCandInstances}