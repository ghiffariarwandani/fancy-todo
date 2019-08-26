const route = require('express').Router()
const user = require('./user-route');
const todo = require('./todo-route');

route.use('/users', user)
route.use('/todos', todo)

module.exports = route