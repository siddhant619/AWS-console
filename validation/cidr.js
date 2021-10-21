const isCidr = require("is-cidr");

const cirdValidation = (vpc, publicSubnet, privateSubnet) => {
  if (
    isCidr(vpc) != 4 ||
    isCidr(publicSubnet) != 4 ||
    isCidr(privateSubnet) != 4
  )
    return false;
  return true;
};
module.exports = { cirdValidation };
