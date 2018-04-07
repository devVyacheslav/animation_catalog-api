const express = require('express')
const router = express.Router()

const Translations = require('../controllers/translations')

router.get('/', Translations.list)
router.post('/new', Translations.create)
router.delete('/:id', Translations.remove)

module.exports = router
