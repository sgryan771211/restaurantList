const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')
const { authenticated } = require('../config/auth')
// 設定路由
// 列出全部 restaurant
router.get('/', authenticated, (req, res) => {
  RestaurantList.find({ userId: req.user._id }, (err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

// 顯示一筆 restaurant 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  RestaurantList.find({ userId: req.user._id }, (err, restaurants) => {
    if (err) return console.error(err)
    const restaurant = restaurants.filter(restaurant => restaurant.id == req.params.id)
    res.render('show', { restaurant: restaurant[0] })
  })
})

// 新增一筆  restaurant
router.post('/', authenticated, (req, res) => {
  let errors = []
  if (!req.body.name || !req.body.name_en || !req.body.category || !req.body.image || !req.body.location || !req.body.phone || !req.body.google_map || !req.body.rating || !req.body.description) {
    errors.push({ message: '新增餐廳資料失敗，所有欄位都是必填' })
  }
  if (errors.length > 0) {
    RestaurantList.find({ userId: req.user._id }, (err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { errors, restaurants: restaurants })
    })
  } else {
    const restaurant = RestaurantList({
      name: req.body.name,
      name_en: req.body.name_en,
      category: req.body.category,
      image: req.body.image,
      location: req.body.location,
      phone: req.body.phone,
      google_map: req.body.google_map,
      rating: req.body.rating,
      description: req.body.description,
      userId: req.user._id
    })
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  }
})

// 修改 restaurant 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  RestaurantList.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

// 修改 restaurant
router.put('/:id', authenticated, (req, res) => {
  let errors = []
  if (!req.body.name || !req.body.name_en || !req.body.category || !req.body.image || !req.body.location || !req.body.phone || !req.body.google_map || !req.body.rating || !req.body.description) {
    errors.push({ message: '修改餐廳資料失敗，所有欄位都是必填' })
  }
  if (errors.length > 0) {
    RestaurantList.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
      if (err) return console.error(err)
      return res.render('edit', { errors, restaurant: restaurant })
    })
  } else {
    RestaurantList.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
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

  }




})

// 刪除 restaurant
router.delete('/:id/delete', authenticated, (req, res) => {
  RestaurantList.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router