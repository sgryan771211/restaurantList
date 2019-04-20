const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')

// 設定路由
// 列出全部 restaurant
router.get('/', (req, res) => {
  RestaurantList.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

// 顯示一筆 restaurant 的詳細內容
router.get('/:id', (req, res) => {
  RestaurantList.find((err, restaurants) => {
    if (err) return console.error(err)
    const restaurant = restaurants.filter(restaurant => restaurant.id == req.params.id)
    res.render('show', { restaurant: restaurant[0] })
  })
})

// 新增一筆  restaurant
router.post('/', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

// 修改 restaurant
router.put('/:id', (req, res) => {
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
router.delete('/:id/delete', (req, res) => {
  RestaurantList.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router