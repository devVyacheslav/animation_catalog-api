const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const Serials = require('../controllers/serials')
const Seasons = require('../controllers/seasons')

router.get('/', Serials.list)
router.get('/:id', Serials.show)
router.put('/:id', Serials.update)
router.post('/new', Serials.create)
router.delete('/:id', Serials.remove)

router.get('/:serialId/seasons', Seasons.list)

module.exports = router
