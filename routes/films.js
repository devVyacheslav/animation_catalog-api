const express = require('express')
const router = express.Router()

const Films = require('../controllers/films')

router.get('/', Films.list)
router.get('/:id', Films.show)
router.post('/new', Films.create)
router.put('/:id', Films.update)
router.delete('/:id', Films.remove)

module.exports = router
