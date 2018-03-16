const express = require('express')
const router = express.Router()
const Countries = require('../controllers/countries')

router.get('/', (req, res, next) => {
  res.send('Welcome to AnimationCatalog API')
})
router.get('/countries', Countries.list)

module.exports = router

// const express = require('express')
// const router = express.Router()

// const Countries = require('../controllers/countries')

// router.get('/', Countries.list)
// router.post('/new', Countries.create)
// router.delete('/:id', Countries.remove)

// module.exports = router
