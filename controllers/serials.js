const Serial = require('../models/serial').Serial

function list (req, res, next) {
  Serial.find().exec((err, serials) => {
    if (err) return next(err)
    res.json(serials)
  })
}

function show (req, res, next) {
  Serial.findOne({ _id: req.params.id })
    .populate('countries directors studios')
    .exec((err, serial) => {
      if (err) return next(err)
      res.json(serial)
    })
}

function update (req, res, next) {
  const id = req.params.id
  Serial.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true })
    .populate('countries directors')
    .exec((err, updatedSerial) => {
      if (err) return next(err)
      res.json(updatedSerial)
    })
}

exports.list = list
exports.show = show
exports.update = update
