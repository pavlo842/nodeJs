const {Router} = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const User = require('../models/user')
const keys = require('../keys')
const router = Router()
const resetEmail = require('../emails/reset')
const regEmail = require('../emails/registrations')

const transporter = nodemailer.createTransport(sendgrid({
    auth: {api_key: keys.SENDGRID_API_KEY}
}))

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Autorization',
        isLogin: true,
        registerError: req.flash('registerError'),
        loginError: req.flash('loginError')
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)

            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/')
                })
            } else {
                req.flash('loginError', 'Wrong password')
                res.redirect('/auth/login#login')
            }
        } else {
            req.flash('loginError', 'User does not exist')
            res.redirect('/auth/login#login')
        }
    } catch (e) {
        console.log(e)
    }
})

router.post('/register', async (req, res) => {
    try {
        const {email, password, repeat, name} = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            req.flash('registerError', 'User exists')
            res.redirect('/auth/login#register')
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const user = new User({
                email, name, password: hashPassword, cart: {items: []}
            })
            await user.save()
            await transporter.sendMail(regEmail(email))
            res.redirect('/auth/login#login')
        }
    } catch (e) {
        console.log(e)
    }
})

// Восстановление пароля
router.get('/reset', (req, res) => {
    res.render('auth/reset', {
        title: 'Forgot your password?',
        error: req.flash('error')
    })
})

// Восстановление пароля
router.post('/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                req.flash('error', 'Something?')
                res.redirect('/auth/reset')
            }

            const token = buffer.toString('hex')
            const candidate = await User.findOne({email: req.body.email})

            if (candidate) {
                candidate.resetToken = token
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
                await candidate.save()
                await transporter.sendMail(resetEmail(candidate.email, token))
                res.redirect('/auth/login')
            } else {
                req.flash('error', 'This email not found!')
                res.redirect('/auth/reset')
            }

        })
    } catch (e) {
        console.log(e)
    }
})

// Задание нового пароля
router.get('/password/:token', async (req, res) => {
    if (!req.params.token) {
        return res.redirect('auth/login')
    }

    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: {$gt: Date.now()}
        })

        if (!user) {
            return res.redirect('/auth/login')
        } else {
            res.render('auth/password', {
                title: 'Restore access',
                error: req.flash('error'),
                userId: user._id.toString(),
                token: req.params.token
            })
        }
    

    } catch (e) {
        console.log(e)
    }
})

module.exports = router
