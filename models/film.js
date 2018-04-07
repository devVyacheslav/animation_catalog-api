const db = require('../db')
const Schema = db.Schema

const FilmShema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: true
    // },
    // originalName: {
    //   type: String,
    //   required: true
    // // },
    // description: {
    //   type: String,
    //   required: true
    // },
    // lengthMs: {
    //   type: Number,
    //   required: true
    // },
    // sizeMb: {
    //   type: Number,
    //   required: true
    // },
    // TODO: проверка на год
    // year: {
    //   type: Number,
    //   required: true
    // },
    // marks: {
    //   selected: { type: Boolean, default: false },
    //   liked: { type: Boolean, default: false },
    //   viewed: { type: Boolean, default: false }
    // },
    // langOriginal: { type: Schema.ObjectId, ref: 'Language' },
    // inDvd: [{ type: Schema.ObjectId, ref: 'Dvd' }], // есть ли на каком-либо DVD
    // cover: {
    //   type: Schema.ObjectId,
    //   ref: 'Image',
    //   default: null
    // },
    // screens: [{ type: Schema.ObjectId, ref: 'Image' }],
    // directors: [{ type: Schema.ObjectId, ref: 'Director' }],
    // countries: [{ type: Schema.ObjectId, ref: 'Country' }],
    // translations: [{ type: Schema.ObjectId, ref: 'Translation' }],
    // subtitles: [{ type: Schema.ObjectId, ref: 'Language' }],
    // studios: [{ type: Schema.ObjectId, ref: 'Studio' }],
    // videoformat: {
    //   type: Schema.ObjectId,
    //   ref: 'Videoformat',
    //   required: true
    // }
  }
)

exports.Film = db.model('Film', FilmShema)
