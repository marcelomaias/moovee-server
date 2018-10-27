const express = require('express')
const genresRouter = require('../routes/genres')
const customerRouter = require('../routes/customers')
const userRouter = require('../routes/users')
const authRouter = require('../routes/auth')
const movieRouter = require('../routes/movies')
const error = require('../middleware/error')

module.exports = function (app) {
  app.use('/api/users', userRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/genres', genresRouter)
  app.use('/api/customers', customerRouter)
  app.use('/api/movies', movieRouter)
  app.use(error)
}