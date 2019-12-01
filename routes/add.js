const {Router} = require('express') 
// 2-й вариант
// const express.Router = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add course',
        isAdd: true
    })
})

module.exports = router