const db = require('../db')
const Schema = db.Schema

const DvdSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  films: [{ type: Schema.ObjectId, ref: 'Film' }],
  cover: {
    type: Schema.ObjectId,
    ref: 'Image',
    default: null
  }
}, { collection: 'dvd'})

exports.Dvd = db.model('Dvd', DvdSchema)
