const Serial = require('../models/serial').Serial
const Images = require('../controllers/images')

function list (req, res, next) {
  Serial.find().populate('cover').exec((err, serials) => {
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

function create (req, res, next) {
  Images.create(req, res, next).then(response => {
    const parsedBodyData = JSON.parse(req.body.data)
    const imgId = response ? response._id : parsedBodyData.cover
    const data = Object.assign(parsedBodyData, { cover: imgId })
    const newSerial = new Serial(data)
    newSerial.save((err, serial) => {
      if (err) return next(err)
      return res.send(serial)
    })
  })
}

function remove (req, res, next) {
  const _id = req.params.id
  Serial.findOneAndRemove({ _id }).exec((err, serial) => {
    if (err) return next(err)
    const coverId = serial.cover._id || serial.cover
    if (coverId) Images.unlinkImage(coverId, res, next)
    return res.send(serial)
  })
}

exports.list = list
exports.show = show
exports.update = update
exports.create = create
exports.remove = remove
