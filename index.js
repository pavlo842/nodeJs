const express = require('express')
const path = require('path')
const csrf = require('csurf')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')
const addRoutes = require('./routes/add')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const authRoutes = require('./routes/auth')
const User = require('./models/user')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')


const MONGODB_URI = `mongodb+srv://pavlo842:BJiUVsoVw1XasikA@cluster0-mpveb.mongodb.net/shop`
const app = express()
const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(csrf())
app.use(varMiddleware)
app.use(userMiddleware)

// Регистрация роутов
app.use('/add', addRoutes) // '/add' - префикс - в add.js оставить только '/'
app.use('/',homeRoutes)
app.use('/courses',coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
} 

start()

