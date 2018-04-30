// const Film = require('../models/film').Film
const Film = require('../models/episode').Episode
const Images = require('../controllers/images')

const populateStr =
  'cover subtitles langOriginal translations videoformat directors countries studios'

async function list(req, res, next) {
  // отфильтровываем эпизоды сериалов
  const countOfFilms = await Film.find().count()

  console.log('countOfFilms', countOfFilms)

  let skip = req.query && req.query.skip ? req.query.skip : 0
  let limit = req.query && req.query.limit ? req.query.limit : 50

  console.log('skip', skip)
  console.log('limit', limit)

  return Film.find({ $and: [{ serial: { $exists: false } }] }, [], {
    skip: Number(skip),
    limit: Number(limit),
    sort: { createdAt: -1 }
  })
    .populate(populateStr)
    .exec((err, films) => {
      if (err) return next(err)
      res.json({ list: films, count: countOfFilms })
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
  const updatedAt = Date.now()

  Images.create(req, res, next).then(
    response => {
      const parsedBodyData = JSON.parse(req.body.data)
      const imgId = response ? response._id : parsedBodyData.cover || null

      const data = Object.assign(parsedBodyData, { cover: imgId, updatedAt })
      Film.findOneAndUpdate({ _id: filmId }, { $set: data }, { new: true })
        .populate(populateStr)
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

function changeMark(req, res, next) {
  const filmId = req.params.id
  // selected, liked, viewed

  Film.findOneAndUpdate({ _id: filmId }, { $set: { marks: req.body } }, { new: true }).exec(
    (err, film) => {
      if (err) return next(err)
      const { _id, marks } = film
      res.json({ _id, marks })
    }
  )
}

exports.list = list
exports.show = show
exports.create = create
exports.update = update
exports.remove = remove
exports.changeMark = changeMark
