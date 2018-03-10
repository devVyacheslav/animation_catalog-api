const db = require('../db')
const Schema = db.Schema

const ImageShema = new Schema({
  fileName: {
    type: String,
    required: true
  }
}, { collection: 'image'})

exports.Image = db.model('Image', ImageShema)
