const Joi = require('joi')
const mongoose = require('mongoose')

const Customer = mongoose.model('Customer', new mongoose.Schema({
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
    maxlength: 50,
    unique: true
  }
}))

function validateCustomer (customer) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(50).email().required()
  }
  return Joi.validate(customer, schema)
}

exports.Customer = Customer
exports.validate = validateCustomer