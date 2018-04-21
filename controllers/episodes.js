const Episode = require('../models/episode').Episode
const Images = require('../controllers/images')

function list (req, res, next) {
  return Episode.find().exec((err, episodes) => {
    if (err) return next(err)
    res.json(episodes)
  })
}

function create (req, res, next) {

  Images.create(req, res, next).then(response => {
    const parsedBodyData = JSON.parse(req.body.data)
    const imgId = response ? response._id : parsedBodyData.cover || null
    const data = Object.assign(parsedBodyData, { cover: imgId })
    const newEpisode = new Episode(data)
  
    newEpisode.save(((err, episode) => {
      if (err) return next(err)
      // return res.send(episode)
      Episode.populate(
        episode,
        { path: 'cover' },
        (err, doc) => {
          if (err) return next(err)
          return res.send(doc)
        }
      )
    }))
  })
}

exports.list = list
exports.create = create

