const express = require('express')
const router = express.Router()

const Videoformats = require('../controllers/videoformats')

router.get('/', Videoformats.list)
router.post('/new', Videoformats.create)
router.delete('/:id', Videoformats.remove)

module.exports = router
