const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')
const { authenticated } = require('../config/auth')
// 設定路由
// search 功能
router.get('/', authenticated, (req, res) => {
  RestaurantList.find({ userId: req.user._id }, (err, restaurants) => {
    if (err) return console.error(err)
    const keyword = req.query.keyword
    const searchResults = restaurants.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: searchResults, keyword: keyword })
  })
})

router.get('/asc', authenticated, (req, res) => {
  RestaurantList.find({ userId: req.user._id })
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

router.get('/desc', authenticated, (req, res) => {
  RestaurantList.find({ userId: req.user._id })
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

router.get('/category', authenticated, (req, res) => {
  RestaurantList.find({ userId: req.user._id })
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

router.get('/rating', authenticated, (req, res) => {
  RestaurantList.find({ userId: req.user._id })
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