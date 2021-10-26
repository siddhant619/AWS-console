const isCidr = require("is-cidr");
const IPCIDR = require("ip-cidr");

const ipValidation = (vpc, publicSubnet, privateSubnet) => {
  if (
    !IPCIDR.isValidAddress(vpc) ||
    !IPCIDR.isValidAddress(publicSubnet) ||
    !IPCIDR.isValidAddress(privateSubnet)
  ) {
    return false;
  } else {
    return true;
  }
};
const isWithin = (vpc, subnet) => {
  const vpcCIDR = new IPCIDR(vpc);
  //const subnetCIDR= new IPCIDR(subnet);
  if (vpcCIDR.contains(subnet)) {
    return true;
  } else {
    console.log(subnet + " not within VPC");
    return false;
  }
};
const cirdValidation = (vpc, publicSubnet, privateSubnet) => {
  if (
    ipValidation(vpc, publicSubnet, privateSubnet) &&
    isWithin(vpc, publicSubnet) &&
    isWithin(vpc, privateSubnet)
  ) {
    return true;
  } else return false;
};
module.exports = { cirdValidation };
