const Serial = require('../models/serial').Serial
const Images = require('../controllers/images')

function list (req, res, next) {
  Serial.find().exec((err, serials) => {
    if (err) return next(err)
    res.json(serials)
  })
}

function show (req, res, next) {
  Serial.findOne({ _id: req.params.id })
    .populate('countries directors studios cover')
    .exec((err, serial) => {
      if (err) return next(err)
      res.json(serial)
    })
}

function update (req, res, next) {
  const serialId = req.params.id
  Images.create(req, res, next).then(
    response => {
      const imgId = response._id
      const parsedBodyData = JSON.parse(req.body.data)
      const data = Object.assign(parsedBodyData, { cover: imgId })
      Serial.findOneAndUpdate({ _id: serialId }, { $set: data }, { new: true })
        .populate('countries directors studios cover')
        .exec((err, updatedSerial) => {
          if (err) return next(err)
          res.json(updatedSerial)
        })
    },
    error => {
      return next(error)
    }
  )
}

exports.list = list
exports.show = show
exports.update = update
