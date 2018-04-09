const db = require('../db')
const Schema = db.Schema

const VideoformatShema = new Schema(
  {
    name: String,
    resolution: String,
    ratio: String,
    format: String
  },
  { collection: 'videoformat' }
)

exports.Videoformat = db.model('Videoformat', VideoformatShema)
