const { urlencoded } = require('express')
const express = require('express')

const userRoutes = require('./routes/user')

const app = express()

// app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})
// app.use('/image', express.static(path.join(__dirname, 'image')))

app.use('/api/auth', userRoutes)

module.exports = app