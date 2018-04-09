const Videoformat = require('../models/videoformat').Videoformat

function list (req, res, next) {
  return Videoformat.find().exec((err, serials) => {
    if (err) return next(err)
    res.json(serials)
  })
}

function create (req, res, next) {
  const newVideoformat = new Videoformat(req.body)
  newVideoformat.save((err, videoformat) => {
    if (err) return next(err)
    return res.send(videoformat)
  })
}

function remove (req, res, next) {
  const _id = req.params.id
  Videoformat.findOneAndRemove({ _id }).exec((err, videoformat) => {
    if (err) return next(err)
    return res.send(videoformat._id)
  })
}

exports.list = list
exports.create = create
exports.remove = remove
