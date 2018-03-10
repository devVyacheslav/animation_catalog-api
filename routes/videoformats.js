const express = require('express')
const router = express.Router()

const Videoformats = require('../controllers/videoformats')

router.get('/', Videoformats.list)

module.exports = router
