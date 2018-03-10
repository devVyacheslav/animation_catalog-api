const config = require('../config')

const mongoose = require('mongoose')
mongoose.connect(config.get('mongoose:uri'))

module.exports = mongoose
