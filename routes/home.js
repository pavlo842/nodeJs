const {Router} = require('express') 
// 2-й вариант
// const express.Router = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home page',
        isHome: true
    })
})

module.exports = router
