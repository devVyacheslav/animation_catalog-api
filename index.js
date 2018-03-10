const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
// const session = require('express-session')
// const cookieParser = require('cookie-parser')
// const checkAuth = require('./middleware/checkAuth')
const config = require('./config')
const db = require('./db')

const errorhandler = require('errorhandler')
const HttpError = require('./error').HttpError

const app = express()
app.set('port', config.get('port'))

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
const films = require('./routes/films')

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

// app.use(cookieParser())
//
// const MongoStore = require('connect-mongo')(session)
// app.use(session({
//   secret: config.get('session:secret'),
//   key: config.get('session:key'),
//   cookie: config.get('session:cookie'),
//   resave: true,
//   saveUninitialized: true,
//   store: new MongoStore({ mongooseConnection: db.connection })
// }))
//
app.use(require('./middleware/sendHttpError'))
// app.use(require('./middleware/loadUser'))
//
const API = config.get('api')

// Init routes
app.use(API, index)
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
app.use(`${API}films`, films)

app.use((err, req, res, next) => {
  if (typeof err === 'number') {
    err = new HttpError(err)
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err)
  } else {
    if (app.get('env') === 'development') {
      errorhandler()(err, req, res, next)
    } else {
      console.error(err)
      err = new HttpError(500)
      res.sendHttpError(err)
    }
  }
})

const port = app.get('port')

const server = http.createServer(app)
server.listen(port, () => {
  console.log('Example App listening on port ' + port + '!')
})
