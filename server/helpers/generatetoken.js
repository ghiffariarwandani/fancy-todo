const jwt = require('jsonwebtoken');

function generatetoken(user){
  const token = jwt.sign(user, `${process.env.SECRET_TOKEN}`)
  return token
}

module.exports = generatetoken