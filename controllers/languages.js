const Language = require('../models/language').Language

function list(req, res, next) {
  return Language.find()
    .exec((err, serials) => {
      if (err) return next(err)
      res.json(serials)
    })
}

function create(req, res, next) {
  const newLanguage = new Language(req.body)
  newLanguage.save((err, language) => {
    if (err) return next(err)
    return res.send(language)
  })
}

exports.list = list
exports.create = create
