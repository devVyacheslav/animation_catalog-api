const db = require('../db')
const Schema = db.Schema

const TranslationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      uniq: true
    }
  },
  { collection: 'translation' }
)

exports.Translation = db.model('Translation', TranslationSchema)
