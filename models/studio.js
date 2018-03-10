const db = require('../db')
const Schema = db.Schema

const StudioShema = new Schema(
  {
    name: {
      type: String,
      required: true,
      uniq: true
    }
  },
  { collection: 'studio' }
)

exports.Studio = db.model('Studio', StudioShema)
