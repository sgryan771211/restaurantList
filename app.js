const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

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
  res.send('建立 restaurant')
})

// 修改 restaurant 頁面
app.get('/restaurantList/:id/edit', (req, res) => {
  res.send('修改 restaurant 頁面')
})

// 修改 restaurant
app.post('/restaurantList/:id', (req, res) => {
  res.send('修改 restaurant')
})

// 刪除 restaurant
app.post('/restaurantList/:id/delete', (req, res) => {
  res.send('刪除 restaurant')
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