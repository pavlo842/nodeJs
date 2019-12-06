// ---
// Подключение заэкспорченного файла (module.exports)
// const obj = require('./user')

// console.log(obj.user)

// obj.sayHello()


// ---
// console.log('Hello', __dirname)
// __dirname - абсолютный путь до папки разработки


// ---
// console.log('Hello', __filename)
// __filename - абсолютный путь до файла разработки



// ---
// First HTTP server

// const http = require('http')

// const server = http.createServer((req, res) => {
//     console.log(req.url)

//     res.write('<h1>Hello from NODE JS</h1>')
//     res.write('<h3>Hello from NODE JS</h3>')
//     res.end(`
//         <div style="background: red; width: 100px; height: 100px;">
//             <h1> The End </h1>
//         </div>
//     `)
// })

// server.listen(3000, () => {
//     console.log('Server is running...')
// })


// ---

// 2-9 Создание простого web-сервера
// 2-10

// const http = require('http')
// const path = require('path')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     if (req.method === 'GET') {
//         res.writeHead(200, {
//             'Content-Type': 'text/html; charset=utf-8'
//         })
//         if (req.url === '/') {
//             fs.readFile(
//                 path.join(__dirname, 'views', 'index.html'),
//                 'utf-8',
//                 (err, content) => {
//                     if (err) {
//                         throw err
//                     }
//                 res.end(content)
//             })
//         } else if (req.url === '/about') {
//             fs.readFile(
//                 path.join(__dirname, 'views', 'about.html'),
//                 'utf-8',
//                 (err, content) => {
//                     if (err) {
//                         throw err
//                     }
//                 res.end(content)
//             })
//         } else if (req.url === '/api/users') {
//             res.writeHead(200, {
//                 'Content-Type': 'text/json'
//             })

//             const users = [
//                 {name: 'Pallo', age: 35},
//                 {name: 'Nath', age: 34}
//             ]

//             res.end(JSON.stringify(users))
//         }
//     } else if (req.method === 'POST') {
//         const body = []
//         res.writeHead(200, {
//             'Content-Type': 'text/html; charset=utf-8'
//         })

//         req.on('data', data => {
//             body.push(Buffer.from(data))
//         })

//         req.on('end', () => {
//             const message = body.toString().split('=')[1]

//             res.end(`
//                 <h1>Ваше сообщение: ${message}</h1>
//             `)
//         })


//     }
// })

// server.listen(3000, () => {
//     console.log('Server is running...')
// })


// ---
// 3-1 NODE-EXPRESS
// 3-3 Handlebars

// 3-6 рендеринг
// 3-7 routers

const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const addRoutes = require('./routes/add')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const coursesRoutes = require('./routes/courses')
const path = require('path')

const app = express()


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/add', addRoutes) // '/add' - префикс - в add.js оставить только '/'
app.use('/',homeRoutes)
app.use('/courses',coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = `mongodb+srv://pavlo842:BJiUVsoVw1XasikA@cluster0-mpveb.mongodb.net/shop`
        await mongoose.connect(url, {
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

