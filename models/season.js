const db = require('../db')
const Schema = db.Schema

const SeasonShema = new Schema(
  {
    number: {
      type: Number,
      required: true,
      min: 0
    },
    name: {
      type: String,
      default: null
    },
    serial: {
      type: Schema.ObjectId,
      ref: 'Serial',
      required: true
    },
    cover: {
      type: Schema.ObjectId,
      ref: 'Image',
      default: null
    }
  },
  { collection: 'season' }
)

exports.Season = db.model('Season', SeasonShema)
