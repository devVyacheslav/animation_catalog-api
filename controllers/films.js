const Film = require('../models/film').Film

function list(req, res, next) {
  return Film.find()
    .exec((err, serials) => {
      if (err) return next(err)
      res.json(serials)
    })
}

exports.list = list
