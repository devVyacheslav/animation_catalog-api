const Translation = require('../models/translation').Translation

function list (req, res, next) {
  return Translation.find().exec((err, translations) => {
    if (err) return next(err)
    res.json(translations)
  })
}

function create (req, res, next) {
  const newTranslation = new Translation(req.body)
  newTranslation.save((err, translation) => {
    if (err) return next(err)
    return res.send(translation)
  })
}

function remove (req, res, next) {
  const _id = req.params.id
  Translation.findOneAndRemove({ _id }).exec((err, translation) => {
    if (err) return next(err)
    return res.send(translation._id)
  })
}

exports.list = list
exports.create = create
exports.remove = remove
