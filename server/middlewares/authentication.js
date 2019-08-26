const jwt = require('jsonwebtoken');
const Todo = require('../models/todo');

module.exports = {
  authentication(req, res, next) {
    try {
      req.decoded = jwt.verify(req.headers.token, `${process.env.SECRET_TOKEN}`)
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  authorization(req, res, next) {
    Todo.findOne({
      _id: req.params.id,
      UserId: req.decoded.id
    })
    .then(found => {
      if(!found) throw new Error('You dont have access')
      else next()
    })
    .catch(next)
  }
};