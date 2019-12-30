const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
    body('email')
        .isEmail()
        .withMessage('ADD EMAIL ! ! !')
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({ email: value })
                if (user) {
                    return Promise.reject('This email is already taken ! ! !')
                }
            } catch (e) {
                console.log(e)
            }
        }).normalizeEmail(),
    body('password', 'Password to be min 6 characters! ! !').isLength({min: 6, max: 56}).isAlphanumeric().trim(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords must match ! ! !')
        }
        return true
    }).trim(),
    body('name').isLength({min: 3}).withMessage('Name must min 3 characters ! ! !').trim()
]

exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Min legth name 3 ch.').trim(),
    body('price').isNumeric().withMessage('Enter price'),
    body('img', 'URL img').isURL()
]
