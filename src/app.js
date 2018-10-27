process.env['NODE_CONFIG_DIR'] = __dirname + '/config/'
const config = require('config')
require('express-async-errors') // NO NEED TO SET IN A CONST
const debug = require('debug')('app:start')
const winston = require('winston') // LOG LIBRARY
const mongoose = require('mongoose')
const express = require('express')

const app = express()
require('./startup/routes')(app)

winston.add(new winston.transports.File({ filename: 'logfile.log' }))

if(!config.get('jwtKey')) {
  console.error('FATAL ERROR: jwtKey not defined.')
  process.exit(1)
}

const uri = 'mongodb://localhost:27017/moovee';
const opts = { 
  useNewUrlParser: true,
  useCreateIndex: true
}
mongoose.connect(uri, opts)
 .then(() => console.log('Connected to MongoDB...'))
 .catch(err => console.error('Could not connect to MongoDB.', err))

app.use(express.json())

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))