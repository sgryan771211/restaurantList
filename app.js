const express = require('express')
const app = express()
const mongoose = require('mongoose')

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
  res.send('hello')
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
  res.send('顯示 restaurant 的詳細內容')
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


app.listen(3000, () => {
  console.log('app is running')
})