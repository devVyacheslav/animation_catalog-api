const Episode = require('../models/episode').Episode

function list (req, res, next) {
  return Episode.find().exec((err, serials) => {
    if (err) return next(err)
    res.json(serials)
  })
}

exports.list = list
