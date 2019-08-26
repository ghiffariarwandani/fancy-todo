const route = require('express').Router()
const UserController = require('../controllers/user-controller')

route.post('/register',UserController.signup)
route.post('/signin', UserController.signin)
route.post('/googlesignin', UserController.signingoogle)


module.exports = route