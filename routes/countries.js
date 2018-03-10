const express = require('express')
const router = express.Router()

const Countries = require('../controllers/countries')

router.get('/', Countries.list)
router.post('/new', Countries.create)

module.exports = router
