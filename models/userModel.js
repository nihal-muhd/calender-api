const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide password']
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please provide confirm password']
  },
  task:[]
},
{
  timestamps: true
})

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel