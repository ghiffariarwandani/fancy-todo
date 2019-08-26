const bcrypt = require('bcryptjs');

function hashpassword(ispassword) {
  var salt = bcrypt.genSaltSync(Number(process.env.SALT_GENERATE));
  var hash = bcrypt.hashSync(`${ispassword}`, salt);
  return hash
}

module.exports = hashpassword