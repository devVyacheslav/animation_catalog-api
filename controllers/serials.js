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
  const reqUp = req
  Images.create(req, res, next).then(
    response => {
      const parsedBodyData = JSON.parse(req.body.data)
      const imgId = response ? response._id : parsedBodyData.cover

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
