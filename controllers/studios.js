const Studio = require('../models/studio').Studio

function list (req, res, next) {
  return Studio.find().exec((err, serials) => {
    if (err) return next(err)
    res.json(serials)
  })
}

function create (req, res, next) {
  const newStudio = new Studio(req.body)
  newStudio.save((err, studio) => {
    if (err) return next(err)
    return res.send(studio)
  })
}

function remove (req, res, next) {
  const _id = req.params.id
  Studio.findOneAndRemove({ _id }).exec((err, studio) => {
    if (err) return next(err)
    return res.send(studio._id)
  })
}

exports.list = list
exports.create = create
exports.remove = remove
