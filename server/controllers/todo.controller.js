const Todo = require('../models/todo')
const {ObjectId} = require('mongodb');
const axios = require('axios');

class TodoController {

  static getTodo(req, res, next){

    Todo.find({
      UserId: req.decoded.id
    })
    .then(found => {
      res.status(200).json({found})
    })
    .catch(err => console.log(err))
  }

  static createTodo(req, res, next){
    
    Todo.create({
      name: req.body.name,
      description: req.body.description,
      duedate: req.body.duedate,
      UserId: ObjectId(req.decoded.id) 
    })
    .then(todo => {
      res.status(201).json({ message: 'berhasil' })
    })
    .catch(next)
  }

  static deleteTodo(req, res, next){
    
    Todo.findByIdAndDelete({
      _id: req.params.id
    })
    .then(response => {
      res.status(200).json({ message: 'deleted'})
    })
    .catch(next)
  }

  static editTodo(req, res, next){

    Todo.updateOne({
      _id:req.params.id }, 
      req.body)
      .then(updatedBook => {
        res.status(200).json({message: 'success'})
      })
      .catch(next)
  }

  static updateTodo(req, res, next){
    
    if(req.query.status == 'true'){
      req.query.status = false
    } else {
      req.query.status = true
    }

    Todo.updateOne({
      _id: req.params.id
    }, req.query)
    .then(response => {
      res.status(200).json({ message: 'updated' })
    })
    .catch(next)
    
  }

  static calender(req, res, next){

    axios({
      method: 'get',
      url: `https://calendarific.com/api/v2/holidays?&api_key=21a5005596e8655011192e888d0342c8b7d3182a&country=id&year=2019`
    })
    .then((holiday) => {
      let isHoliday = holiday.data.response.holidays
      res.status(200).json(isHoliday)
    })
    .catch(next)
  }

}

module.exports = TodoController