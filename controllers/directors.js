const Director = require('../models/director').Director

function list (req, res, next) {
  return Director.find().exec((err, directors) => {
    if (err) return next(err)
    return res.send(directors)
  })
}

function create (req, res, next) {
  const newDirector = new Director(req.body)
  newDirector.save((err, director) => {
    if (err) return next(err)
    return res.send(director)
  })
}

function remove (req, res, next) {
  const _id = req.params.id
  Director.findOneAndRemove({ _id }).exec((err, director) => {
    if (err) return next(err)
    return res.send(director._id)
  })
}

exports.list = list
exports.create = create
exports.remove = remove
