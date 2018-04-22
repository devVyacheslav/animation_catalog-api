const express = require('express')
const router = express.Router()

const Episodes = require('../controllers/episodes')

router.get('/:id', Episodes.show)
router.post('/new', Episodes.create)
router.put('/:id', Episodes.update)
router.delete('/:id', Episodes.remove)

module.exports = router
