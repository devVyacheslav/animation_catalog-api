const db = require('../db')
const Schema = db.Schema

const LanguageShema = new Schema({
  name: {
    type: String,
    required: true,
    uniq: true
  }
}, { collection: 'language' })

exports.Language = db.model('Language', LanguageShema)
