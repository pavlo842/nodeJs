const {Router} = require('express') 
// 2-й вариант
// const express.Router = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('courses', {
        title: 'Courses',
        isCourses: true
    })
})

module.exports = router
