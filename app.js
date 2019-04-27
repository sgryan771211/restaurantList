const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodoOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(methodoOverride('_method'))

app.use(session({
  secret: 'asdfghjkl',
  resave: 'false',
  saveUninitialized: 'false',
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

// 設定靜態檔案
app.use(express.static('public'))

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected')
})

// 載入 model
const RestaurantList = require('./models/restaurantList')

// 設定路由
app.use('/', require('./routes/home'))
app.use('/sort', require('./routes/sort'))
app.use('/search', require('./routes/search'))
app.use('/restaurantList', require('./routes/restaurantList'))
app.use('/users', require('./routes/user'))

// 設定 express port 3000
app.listen(3000, () => {
  console.log('app is running')
})