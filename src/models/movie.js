const Joi = require('joi')
const mongoose = require('mongoose')
const { genreSchema } = require('./genre') 

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  genre: {
    type: genreSchema,  
    required: true
  }
}))

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
  }

  return Joi.validate(movie, schema)
}

exports.Movie = Movie 
exports.validate = validateMovie