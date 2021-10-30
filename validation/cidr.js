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
const cidrValidation = (vpc, publicSubnet, privateSubnet) => {
  if (!IPCIDR.isValidAddress(vpc)) {
    return { isValid: false, message: "VPC CIDR invalid!" };
  }
  if (!IPCIDR.isValidAddress(publicSubnet)) {
    return { isValid: false, message: "Public subnet CIDR invalid!" };
  }
  if (!IPCIDR.isValidAddress(privateSubnet)) {
    return { isValid: false, message: "Private subnet CIDR invalid!" };
  }
  return { isValid: true };
};
module.exports = { cidrValidation };
