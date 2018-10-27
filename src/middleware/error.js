const winston = require('winston')

module.exports = function (err, req, res, next) {
  winston.error(err.message) // THIS IS NOT SHOWING THE ERROR IN THE LOGFILE FOR NOW
  res.status(500).send('Something has gone wrong.')
}