const Translation = require('../models/translation').Translation

function list(req, res, next) {
  return Translation.find()
    .exec((err, serials) => {
      if (err) return next(err)
      res.json(serials)
    })
}

function create(req, res, next) {
  const newTranslation = new Translation(req.body)
  newTranslation.save((err, translation) => {
    if (err) return next(err)
    return res.send(translation)
  })
}

exports.list = list
exports.create = create
