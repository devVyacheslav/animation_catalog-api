const db = require('../db')
const Schema = db.Schema

const NoteShema = new Schema({
  text: {
    type: String,
    required: true
  },
  importance: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated: {
    type: Date,
    default: null
  }
}, { collection: 'note'})

exports.Note = db.model('Note', NoteShema)
