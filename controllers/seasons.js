const Season = require('../models/season').Season
const Images = require('../controllers/images')

function list (req, res, next) {
  const { serialId } = req.params
  return Season.find(
    {
      serial: serialId
    },
    [],
    { sort: { number: 1 } }
  )
    .populate('cover')
    .exec((err, seasons) => {
      if (err) return next(err)
      res.json(seasons)
    })
}

function create (req, res, next) {
  Images.create(req, res).then(response => {
    const parsedBodyData = JSON.parse(req.body.data)
    const imgId = response ? response._id : parsedBodyData.cover || null
    const data = Object.assign(parsedBodyData, { cover: imgId })

    const newSeason = new Season(data)
    newSeason.save((err, season) => {
      if (err) return next(err)
      Season.populate(season, { path: 'cover' }, (err, doc) => {
        if (err) return next(err)
        return res.send(doc)
      })
    })
  })
}

function update (req, res, next) {
  const seasonId = req.params.id

  Images.create(req, res, next).then(response => {
    const parsedBodyData = JSON.parse(req.body.data)
    const imgId = response ? response._id : parsedBodyData.cover || null
    const data = Object.assign(parsedBodyData, { cover: imgId })
    Season.findOneAndUpdate({ _id: seasonId }, { $set: data }, { new: true })
      .populate('cover')
      .exec((err, updatedSeason) => {
        if (err) return next(err)
        res.json(updatedSeason)
      })
  })
}

function remove (req, res, next) {
  const _id = req.params.id
  Season.findOneAndRemove({ _id }).exec((err, season) => {
    if (err) return next(err)
    if (season.cover) {
      const coverId = typeof season.cover === 'string'
        ? season.cover
        : season.cover._id
      Images.unlinkImage(coverId, res, next)
    }
    return res.send(season)
  })
}

exports.list = list
exports.create = create
exports.update = update
exports.remove = remove
