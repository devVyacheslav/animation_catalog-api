const express = require('express')
const router = express.Router()

const Dvds = require('../controllers/dvds')

router.get('/', Dvds.list)

module.exports = router
