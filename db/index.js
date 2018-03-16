// const config = require('../config')

const mongoose = require('mongoose')
// mongoose.connect(config.get('mongoose:uri'))
mongoose.connect(process.env.MONGODB_URI)

module.exports = mongoose
