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

exports.list = list
exports.create = create
