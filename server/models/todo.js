const { Schema, model, ObjectId } = require('mongoose');

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: Boolean,
    default: false
  },
  duedate: {
    type: Date,
    required: true,
    min: new Date('2019-08-13')
  }, 
  UserId: {
    type: ObjectId,
    ref: 'User'
  }
})

const Todo = model('Todo', TodoSchema)

module.exports = Todo