const bcrypt = require('bcryptjs');

function compare(clientpass, dbpass){
  return bcrypt.compareSync(clientpass, dbpass)
}

module.exports = compare