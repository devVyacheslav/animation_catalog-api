const express = require('express')
const router = express.Router()

const Seasons = require('../controllers/seasons')
const Episodes = require('../controllers/episodes')

router.get('/:id', Seasons.show)
router.post('/new', Seasons.create)
router.put('/:id', Seasons.update)
router.delete('/:id', Seasons.remove)

router.get('/:seasonId/episodes', Episodes.list)

module.exports = router
