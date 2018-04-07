const express = require('express')
const router = express.Router()

const Seasons = require('../controllers/seasons')

router.get('/:serialId', Seasons.list)
router.get('/:id/show', Seasons.show)
router.post('/new', Seasons.create)
router.put('/:id', Seasons.update)
router.delete('/:id', Seasons.remove)

module.exports = router
