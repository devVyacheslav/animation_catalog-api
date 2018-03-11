const Country = require('../models/country').Country

function list (req, res, next) {
  return Country.find().exec((err, serials) => {
    if (err) return next(err)
    res.json(serials)
  })
}

function create (req, res, next) {
  const newCountry = new Country(req.body)
  newCountry.save((err, country) => {
    if (err) return next(err)
    return res.send(country)
  })
}

function remove (req, res, next) {
  const _id = req.params.id
  Country.findOneAndRemove({ _id }).exec((err, country) => {
    if (err) return next(err)
    return res.send(country._id)
  })
}

exports.list = list
exports.create = create
exports.remove = remove
