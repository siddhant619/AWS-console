const isPhoneValid = (phone) => {
  var phoneno = /^\d{10}$/;
  if (phone.match(phoneno)) return true;
  else {
    return false;
  }
};
module.exports = { isPhoneValid };
