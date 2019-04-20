const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')

// 設定路由
// 排序功能
router.get('/asc', (req, res) => {
  RestaurantList.find({})
    .sort({ name: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      const sort = 'asc'
      return res.render('index', { restaurants: restaurants, sort: sort })
    })
})

router.get('/desc', (req, res) => {
  RestaurantList.find({})
    .sort({ name: 'desc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      const sort = 'desc'
      return res.render('index', { restaurants: restaurants, sort: sort })
    })
})

router.get('/category', (req, res) => {
  RestaurantList.find({})
    .sort({ category: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      const sort = 'category'
      return res.render('index', { restaurants: restaurants, sort: sort })
    })
})

router.get('/rating', (req, res) => {
  RestaurantList.find({})
    .sort({ rating: 'desc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      const sort = 'rating'
      return res.render('index', { restaurants: restaurants, sort: sort })
    })
})

module.exports = router