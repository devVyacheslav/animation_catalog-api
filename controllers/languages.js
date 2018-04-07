const Language = require('../models/language').Language

function list (req, res, next) {
  return Language.find().exec((err, languages) => {
    if (err) return next(err)
    res.json(languages)
  })
}

function create (req, res, next) {
  const newLanguage = new Language(req.body)
  newLanguage.save((err, language) => {
    if (err) return next(err)
    return res.send(language)
  })
}

function remove (req, res, next) {
  const _id = req.params.id
  Language.findOneAndRemove({ _id }).exec((err, language) => {
    if (err) return next(err)
    return res.send(language._id)
  })
}

exports.list = list
exports.create = create
exports.remove = remove
