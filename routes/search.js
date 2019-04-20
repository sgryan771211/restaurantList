const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')

// 設定路由
// search 功能
router.get('/', (req, res) => {
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

router.get('/asc', (req, res) => {
  RestaurantList.find({})
    .sort({ name: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      const keyword = req.query.keyword
      const searchResults = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants: searchResults, keyword: keyword })
    })
})

router.get('/desc', (req, res) => {
  RestaurantList.find({})
    .sort({ name: 'desc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      const keyword = req.query.keyword
      const searchResults = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants: searchResults, keyword: keyword })
    })
})

router.get('/category', (req, res) => {
  RestaurantList.find({})
    .sort({ category: 'asc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      const keyword = req.query.keyword
      const searchResults = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants: searchResults, keyword: keyword })
    })
})

router.get('/rating', (req, res) => {
  RestaurantList.find({})
    .sort({ rating: 'desc' })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      const keyword = req.query.keyword
      const searchResults = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants: searchResults, keyword: keyword })
    })
})

module.exports = router