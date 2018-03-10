const express = require('express')
const router = express.Router()

const Directors = require('../controllers/directors')

router.get('/', Directors.list)
router.post('/new', Directors.create)
router.delete('/:id', Directors.remove)

module.exports = router
