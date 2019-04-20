const express = require('express')
const app = express()

// 設定路由
app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(3000, () => {
  console.log('app is running')
})