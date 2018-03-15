const express = require('express')
const router = express.Router()

const Images = require('../controllers/images')

router.delete('/:id', Images.remove)

module.exports = router
