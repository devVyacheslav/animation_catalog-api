const express = require('express')
const router = express.Router()

const Serials = require('../controllers/serials')

router.get('/', Serials.list)
router.get('/:id', Serials.show)
router.put('/:id', Serials.update)

module.exports = router
