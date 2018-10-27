const express = require('express')
const router = express.Router()
const {Genre, validate} = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

// async (req, res) FUNCTION PASSED HERE AS THE HANDLER IN ../middleware/async
router.get('/', async (req, res) => {
  const genres = await Genre.find()
  res.send(genres)
})

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const genre = new Genre({ 
    name: req.body.name 
  })
  await genre.save()
  res.send(genre)
})

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  if(!genre) return res.status(404).send('Genre not found.')

  res.send(genre)
})

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name}, { new: true })
  
  if(!genre) return res.status(404).send('Genre not found.')

  res.send(genre)  
})

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)
  if(!genre) return res.status(404).send('Genre not found.')

  res.send(genre)
})

module.exports = router