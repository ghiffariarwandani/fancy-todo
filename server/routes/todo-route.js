const route = require('express').Router()
const TodoController = require('../controllers/todo.controller')
const { authentication, authorization } = require('../middlewares/authentication');

route.use(authentication)
route.get('/calender', TodoController.calender)
route.get('/', TodoController.getTodo)
route.post('/', TodoController.createTodo)
route.delete('/:id', authorization, TodoController.deleteTodo)
route.put('/:id', authorization, TodoController.editTodo)
route.patch('/:id', authorization, TodoController.updateTodo)

module.exports = route