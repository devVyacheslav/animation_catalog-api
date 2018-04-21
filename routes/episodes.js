const express = require('express')
const router = express.Router()

const Episodes = require('../controllers/episodes')

router.get('/', Episodes.list)
router.post('/new', Episodes.create)

module.exports = router