const { Schema, model, ObjectId } = require('mongoose');

const validateEmail = function(email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'username already use']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: 'already use',
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  }
},{timestamps: true})

const User = model('User', userSchema)

module.exports = User