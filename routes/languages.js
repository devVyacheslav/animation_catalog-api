const express = require('express')
const router = express.Router()

const Languages = require('../controllers/languages')

router.get('/', Languages.list)
router.post('/new', Languages.create)
router.delete('/:id', Languages.remove)

module.exports = router
