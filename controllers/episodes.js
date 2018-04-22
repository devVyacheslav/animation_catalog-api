const Episode = require('../models/episode').Episode
const Images = require('../controllers/images')

function list(req, res, next) {
  const { seasonId } = req.params
  return Episode.find({ season: seasonId }, [], { sort: { number: 1 } })
    .populate('cover subtitles langOriginal translations videoformat')
    .exec((err, episodes) => {
      if (err) return next(err)
      res.json(episodes)
    })
}

function show(req, res, next) {
  Episode.findOne({ _id: req.params.id })
    .populate('cover subtitles langOriginal translations videoformat')
    .exec((err, episode) => {
      if (err) return next(err)
      res.json(episode)
    })
}

function create(req, res, next) {
  Images.create(req, res, next).then(response => {
    const parsedBodyData = JSON.parse(req.body.data)
    const imgId = response ? response._id : parsedBodyData.cover || null
    const data = Object.assign(parsedBodyData, { cover: imgId })
    const newEpisode = new Episode(data)

    newEpisode.save((err, episode) => {
      if (err) return next(err)
      Episode.populate(
        episode,
        { path: 'cover subtitles langOriginal translations videoformat' },
        (err, doc) => {
          if (err) return next(err)
          return res.send(doc)
        }
      )
    })
  })
}

function update(req, res, next) {
  const episodeId = req.params.id

  Images.create(req, res, next).then(
    response => {
      const parsedBodyData = JSON.parse(req.body.data)
      const imgId = response ? response._id : parsedBodyData.cover || null

      const data = Object.assign(parsedBodyData, { cover: imgId })
      Episode.findOneAndUpdate({ _id: episodeId }, { $set: data }, { new: true })
        .populate('cover subtitles langOriginal translations videoformat')
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
  Episode.findOneAndRemove({ _id }).exec((err, episode) => {
    if (err) return next(err)
    if (episode.cover) {
      const coverId = typeof episode.cover === 'string' ? episode.cover : episode.cover._id
      Images.unlinkImage(coverId, res, next)
    }
    return res.send(episode)
  })
}

exports.list = list
exports.show = show
exports.create = create
exports.update = update
exports.remove = remove
