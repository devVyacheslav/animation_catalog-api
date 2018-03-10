const Season = require('../models/season').Season

function list(req, res, next) {
  return Season.find({
    serial: req.body.serialId
  })
    .exec((err, serials) => {
      if (err) return next(err)
      res.json(serials)
    })
}

exports.list = list
