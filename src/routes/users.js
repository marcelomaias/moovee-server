const _ = require('lodash')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const {User, validate} = require('../models/user')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
  const users = await User
  .find()
  res.send(users)
})

router.get('/me', auth, async (req, res) => {  // GET THE LOGGED IN USER
  const user = await User.findById(req.user._id).select('-password')
  res.send(user)
})

router.post('/', async (req, res) => {  // CREATE A NEW USER
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  let user = await User.findOne({ email: req.body.email }) // CHECK IF EMAIL IS UNIQUE
  if (user) return res.status(400).send('User already registered.')

  user = new User (_.pick(req.body, ['name', 'email', 'password'])) // SET USER WITH THE PAYLOAD FROM REQ
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  await user.save()

  const token = user.generateAuthToken() // GENERATE TOKEN
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email'])) // SET TOKEN IN THE HEADER TO THE CLIENT
})

module.exports = router