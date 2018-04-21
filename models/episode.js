const db = require('../db')
const Schema = db.Schema

const EpisodeShema = new Schema(
  {
    number: {
      type: Number,
      min: 0
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
    releaseDate: {
      type: Date,
      required: true
    },
    timeTrack: {
      type: Number,
      required: true,
      min: 0
    },
    sizeMb: {
      type: Number,
      min: 0
    },
    // marks: {
    //   selected: { type: Boolean, default: false },
    //   liked: { type: Boolean, default: false },
    //   viewed: { type: Boolean, default: false }
    // },
    cover: {
      type: Schema.ObjectId,
      ref: 'Image',
      default: null
    },
    season: {
      type: Schema.ObjectId,
      ref: 'Season'
    }, // если это эпизод сезона
    serial: {
      type: Schema.ObjectId,
      ref: 'Serial'
    }, // если это эпизод сериала
    // inDvd: [{ type: Schema.ObjectId, ref: 'Dvd' }], // есть ли на каком-либо DVD
    // screens: [{ type: Schema.ObjectId, ref: 'Image' }], // скриншоты
    subtitles: [{ type: Schema.ObjectId, ref: 'Language' }], // языки субтитров если есть
    langOriginal: { type: Schema.ObjectId, ref: 'Language' }, // язык оригинала
    translations: [{ type: Schema.ObjectId, ref: 'Translation' }], // авторские переводы
    // directors: [{ type: Schema.ObjectId, ref: 'Director' }], // режиссеры для к/м и полного метра
    // countries: [{ type: Schema.ObjectId, ref: 'Country' }], // страны для к/м и полного метра
    // studios: [{ type: Schema.ObjectId, ref: 'Studio' }], // студии для к/м и полного метра
    videoformat: {
      type: Schema.ObjectId,
      ref: 'Videoformat',
      required: true
    }
  },
  { collection: 'episode' }
)

exports.Episode = db.model('Episode', EpisodeShema)
