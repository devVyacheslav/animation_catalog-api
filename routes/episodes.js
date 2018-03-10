const express = require('express')
const router = express.Router()

const Episodes = require('../controllers/episodes')

router.get('/', Episodes.list)

module.exports = router
