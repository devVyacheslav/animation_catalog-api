// const Film = require('../models/film').Film
const Film = require('../models/episode').Episode
const Images = require('../controllers/images')

const populateStr =
  'cover subtitles langOriginal translations videoformat directors countries studios'

function list(req, res, next) {
  // отфильтровываем эпизоды сериалов
  return Film.find({ $and: [{ serial: { $exists: false } }] })
    .populate(populateStr)
    .exec((err, films) => {
      if (err) return next(err)
      res.json(films)
    })
}

function show(req, res, next) {
  Film.findOne({ _id: req.params.id })
    .populate('cover')
    .exec((err, film) => {
      if (err) return next(err)
      res.json(film)
    })
}

function create(req, res, next) {
  Images.create(req, res, next).then(response => {
    const parsedBodyData = JSON.parse(req.body.data)
    const imgId = response ? response._id : parsedBodyData.cover || null
    const data = Object.assign(parsedBodyData, { cover: imgId })
    const newFilm = new Film(data)

    newFilm.save((err, film) => {
      if (err) return next(err)
      Film.populate(film, { path: populateStr }, (err, doc) => {
        if (err) return next(err)
        return res.send(doc)
      })
    })
  })
}

function update(req, res, next) {
  const filmId = req.params.id

  Images.create(req, res, next).then(
    response => {
      const parsedBodyData = JSON.parse(req.body.data)
      const imgId = response ? response._id : parsedBodyData.cover || null

      const data = Object.assign(parsedBodyData, { cover: imgId })
      Film.findOneAndUpdate({ _id: filmId }, { $set: data }, { new: true })
        .populate('cover')
        .exec((err, doc) => {
          if (err) return next(err)
          res.json(doc)
        })
    },
    error => {
      return next(error)
    }
  )
}

function remove(req, res, next) {
  const _id = req.params.id
  Film.findOneAndRemove({ _id }).exec((err, film) => {
    if (err) return next(err)
    if (film.cover) {
      const coverId = typeof film.cover === 'string' ? film.cover : film.cover._id
      Images.unlinkImage(coverId, res, next)
    }
    return res.send(film)
  })
}

exports.list = list
exports.show = show
exports.create = create
exports.update = update
exports.remove = remove
