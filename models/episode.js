const db = require('../db')
const Schema = db.Schema

const EpisodeShema = new Schema({
  number: {
    type: Number,
    required: true,
    min: 0,
  },
  name: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    minlength: 5,
    mixlength: 5000
  },
  date: {
    type: Date,
    required: true
  },
  lengthMs: {
    type: Number,
    required: true,
    min: 0
  },
  sizeMb: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  marks: {
    selected: { type: Boolean, default: false },
    liked: { type: Boolean, default: false },
    viewed: { type: Boolean, default: false }
  },
  cover: {
    type: Schema.ObjectId,
    ref: 'Image',
    default: null
  },
  season: {
    type: Schema.ObjectId,
    ref: 'Season',
    required: true
  },
  serial: {
    type: Schema.ObjectId,
    ref: 'Serial',
    required: true
  },
  screens: [{ type: Schema.ObjectId, ref: 'Image'}],
  subtitles: [{ type: Schema.ObjectId, ref: 'Language' }],
  langOriginal: { type: Schema.ObjectId, ref: 'Language' },
  notes: [{ type: Schema.ObjectId, ref: 'Note'}],
  videoformat: {
    type: Schema.ObjectId,
    ref: 'Videoformat',
    required: true
  }
}, { collection: 'episode'})

exports.Episode = db.model('Episode', EpisodeShema)
