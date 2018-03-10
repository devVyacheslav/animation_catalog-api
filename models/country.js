const db = require('../db')
const Schema = db.Schema

const CountrySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  iso: {
    type: String,
    required: true,
    unique: true
  }
}, { collection: 'country' })

exports.Country = db.model('Country', CountrySchema)
