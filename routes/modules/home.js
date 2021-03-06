const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant')

// 首頁瀏覽全部餐廳
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurantsData => res.render("index", { restaurantsData }))
    .catch(err => console.log(err))
})
// 搜尋功能
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurant.find({ userId })
    .lean()
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      if (filterRestaurantsData.length === 0) {
        res.redirect('/')
      } else {
        res.render('index', { restaurantsData: filterRestaurantsData, keyword: keyword })
      }
    })
    .catch(err => console.log(err))
})

module.exports = router 