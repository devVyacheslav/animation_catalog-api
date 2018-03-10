const express = require('express')
const router = express.Router()

const Seasons = require('../controllers/seasons')

router.get('/', Seasons.list)

module.exports = router
