const db = require('../db')
const Schema = db.Schema

const DirectorSchema = new Schema(
  {
    name: {
      first: {
        type: String
      },
      last: {
        type: String,
        required: true
      }
    },
    originalName: {
      first: {
        type: String
      },
      last: {
        type: String,
        required: true
      }
    }
  },
  { collection: 'director' }
)

// DirectorSchema.virtual('fullName').get(
//   () => `${this.name.last} ${this.name.first}`
// )
// DirectorSchema.virtual('fullNameOriginal').get(
//   () => `${this.originalName.last} ${this.originalName.first}`
// )

exports.Director = db.model('Director', DirectorSchema)
