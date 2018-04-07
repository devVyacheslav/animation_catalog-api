const express = require('express')
const path = require('path')
require('dotenv').config()

const http = require('http')
const bodyParser = require('body-parser')
const db = require('./db')

const PORT = process.env.PORT || 3000
const API = '/api/v1/'
const NODE_ENV = process.env.NODE_ENV || 'development'

const errorhandler = require('errorhandler')
const HttpError = require('./error').HttpError

const app = express()

// Declare routes
const index = require('./routes')
const countries = require('./routes/countries')
const languages = require('./routes/languages')
const directors = require('./routes/directors')
const studios = require('./routes/studios')
const translations = require('./routes/translations')
const videoformats = require('./routes/videoformats')
const serials = require('./routes/serials')
const seasons = require('./routes/seasons')
const episodes = require('./routes/episodes')
const dvds = require('./routes/dvds')
// const films = require('./routes/films')
const images = require('./routes/images')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use('/public', express.static('public'))

const sendHttpError = require('./middleware/sendHttpError')
app.use(sendHttpError)

// Init routes
app.use('/', index)
app.use(`${API}countries`, countries)
app.use(`${API}directors`, directors)
app.use(`${API}languages`, languages)
app.use(`${API}studios`, studios)
app.use(`${API}translations`, translations)
app.use(`${API}videoformats`, videoformats)
app.use(`${API}serials`, serials)
app.use(`${API}seasons`, seasons)
app.use(`${API}episodes`, episodes)
app.use(`${API}dvds`, dvds)
// app.use(`${API}films`, films)
app.use(`${API}images`, images)

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

app.use((err, req, res, next) => {
  if (typeof err === 'number') {
    err = new HttpError(err)
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err)
  } else {
    if (NODE_ENV === 'development') {
      errorhandler()(err, req, res, next)
    } else {
      console.error(err)
      err = new HttpError(500)
      res.sendHttpError(err)
    }
  }
})

const server = http.createServer(app)
server.listen(PORT, () => {
  console.log('Example App listening on port ' + PORT + '!')
})
