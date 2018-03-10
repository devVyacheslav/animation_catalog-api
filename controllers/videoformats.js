const Videoformat = require('../models/videoformat').Videoformat

function list(req, res, next) {
  return Videoformat.find()
    .exec((err, serials) => {
      if (err) return next(err)
      res.json(serials)
    })
}

exports.list = list
