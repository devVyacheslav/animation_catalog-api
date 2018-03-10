const Image = require('../models/image').Image
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

const upload = multer({ storage: storage }).single('cover')

function create (req, res, next) {
  return new Promise((resolve, reject) => {
    upload(req, res, err => {
      const newImage = new Image(req.file)
      newImage.save((err, image) => {
        if (err) reject(err)
        resolve(image)
      })
    })
  })
}

exports.create = create
