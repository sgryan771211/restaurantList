const express = require('express')
const router = express.Router()
const RestaurantList = require('../models/restaurantList')
const { authenticated } = require('../config/auth')
// 設定路由
// restaurantList 首頁
router.get('/', authenticated, (req, res) => {
  RestaurantList.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

module.exports = router