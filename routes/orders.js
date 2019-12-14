const {Router} = require('express')
const Order = require('../models/order')
const router = Router()

// Рендеринг страницы
router.get('/', async (req, res) => {
    res.render('orders', {
        isOrder: true,
        title: 'Orders'
    })
})

// Оформление заказа и перенаправление на страницу Orders
router.post('/', async (req, res) => {
    res.redirect('/orders')
})

module.exports = router
