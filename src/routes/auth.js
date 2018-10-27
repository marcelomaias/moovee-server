const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const {User} = require('../models/user')
const Joi = require('joi')

router.post('/', async (req, res) => {  // LOGIN USER
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email or password.')

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.status(400).send('Invalid email or password.')

  const token = user.generateAuthToken() // GET TOKEN. NOT STORED IN THE SERVER
  // LOGOUT SHOULD BE SET ON THE CLIENT, BY DELETING THE TOKEN THERE.
  res.send(token)
})


function validate (req) {
  const schema = {
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(3).max(255).required()
  }
  return Joi.validate(req, schema)
}

module.exports = router