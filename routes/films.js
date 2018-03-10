const express = require('express')
const router = express.Router()

const Films = require('../controllers/films')

router.get('/', Films.list)

module.exports = router
