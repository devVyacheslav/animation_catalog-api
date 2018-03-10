const Dvd = require('../models/dvd').Dvd

function list(req, res, next) {
  return Dvd.find()
    .exec((err, serials) => {
      if (err) return next(err)
      res.json(serials)
    })
}

exports.list = list
