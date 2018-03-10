const express = require('express')
const router = express.Router()

const Studios = require('../controllers/studios')

router.get('/', Studios.list)
router.post('/new', Studios.create)
router.delete('/:id', Studios.remove)

module.exports = router
