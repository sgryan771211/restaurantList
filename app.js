const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態檔案
app.use(express.static('public'))

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true })

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
// restaurantList 首頁
app.get('/', (req, res) => {
  RestaurantList.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

// 列出全部 restaurant
app.get('/restaurantList', (req, res) => {
  res.send('列出所有 restaurant')
})

// 新增一筆 restaurant 頁面
app.get('/restaurantList/new', (req, res) => {
  res.send('新增 restaurant 頁面')
})

// 顯示一筆 restaurant 的詳細內容
app.get('/restaurantList/:id', (req, res) => {
  RestaurantList.find((err, restaurants) => {
    if (err) return console.error(err)
    const restaurant = restaurants.filter(restaurant => restaurant.id == req.params.id)
    res.render('show', { restaurant: restaurant[0] })
  })
})

// 新增一筆  restaurant
app.post('/restaurantList', (req, res) => {
  const restaurant = RestaurantList({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 修改 restaurant 頁面
app.get('/restaurantList/:id/edit', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

// 修改 restaurant
app.post('/restaurantList/:id', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurantList/${req.params.id}`)
    })
  })
})

// 刪除 restaurant
app.post('/restaurantList/:id/delete', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// search 功能
app.get('/search', (req, res) => {
  RestaurantList.find((err, restaurants) => {
    if (err) return console.error(err)
    const keyword = req.query.keyword
    const searchResults = restaurants.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: searchResults, keyword: keyword })
  })
})


app.listen(3000, () => {
  console.log('app is running')
})