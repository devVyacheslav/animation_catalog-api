const express = require('express')
const router = express.Router()

const Dvds = require('../controllers/dvds')

router.get('/', Dvds.list)
router.get('/:id', Dvds.show)
router.post('/new', Dvds.create)
router.put('/:id', Dvds.update)
router.delete('/:id', Dvds.remove)

module.exports = router
