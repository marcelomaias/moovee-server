const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true, 
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 1024,
  },
  isAdmin: Boolean
  // roles: [], THE ROLES AVAILABLE
  // operations: [] OPERATIONS CENTAIN USERS HAVE ACCESS
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ 
    _id: this._id, // SEND ID TO THE TOKEN
    isAdmin: this.isAdmin // SEND ISADMIN TO THE TOKEN
  }, config.get('jwtKey'))
  return token
}
const User = mongoose.model('User', userSchema)

function validateUser (user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(3).max(255).required()
    // isAdmin: Joi.boolean()
  }
  return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser