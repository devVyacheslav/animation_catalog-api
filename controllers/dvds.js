const Dvd = require('../models/dvd').Dvd

function list(req, res, next) {
  return Dvd.find().exec((err, dvds) => {
    if (err) return next(err)
    res.json(dvds)
  })
}

function show(req, res, next) {
  Dvd.findOne({ _id: req.params.id })
    .populate('cover')
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
    const newDvd = new Dvd(data)

    newDvd.save((err, dvd) => {
      if (err) return next(err)
      Dvd.populate(dvd, { path: 'cover' }, (err, doc) => {
        if (err) return next(err)
        return res.send(doc)
      })
    })
  })
}

function update(req, res, next) {
  const dvdId = req.params.id

  Images.create(req, res, next).then(
    response => {
      const parsedBodyData = JSON.parse(req.body.data)
      const imgId = response ? response._id : parsedBodyData.cover || null

      const data = Object.assign(parsedBodyData, { cover: imgId })
      Dvd.findOneAndUpdate({ _id: dvdId }, { $set: data }, { new: true })
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
  Dvd.findOneAndRemove({ _id }).exec((err, dvd) => {
    if (err) return next(err)
    if (dvd.cover) {
      const coverId = typeof dvd.cover === 'string' ? dvd.cover : dvd.cover._id
      Images.unlinkImage(coverId, res, next)
    }
    return res.send(dvd)
  })
}

exports.list = list
exports.show = show
exports.create = create
exports.update = update
exports.remove = remove
