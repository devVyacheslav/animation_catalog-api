const db = require('../db')
const Schema = db.Schema

const SerialShema = new Schema(
  {
    name: {
      type: String,
      required: true,
      uniq: true
    },
    originalName: {
      type: String,
      required: true,
      uniq: true
    },
    description: {
      type: String,
      minlength: 5,
      mixlength: 5000
    },
    cover: {
      type: Schema.ObjectId,
      ref: 'Image',
      default: null
    },
    countries: [{ type: Schema.ObjectId, ref: 'Country' }],
    directors: [{ type: Schema.ObjectId, ref: 'Director' }],
    studios: [{ type: Schema.ObjectId, ref: 'Studio' }]
  },
  { collection: 'serial' }
)

exports.Serial = db.model('Serial', SerialShema)
