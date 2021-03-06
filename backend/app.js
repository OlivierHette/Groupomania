const { urlencoded }    = require('express')
const express           = require('express')
const path              = require('path')
const cors              = require('cors')

const userRoutes        = require('./routes/user')
const postRoutes        = require('./routes/post')
const commentRoutes     = require('./routes/comments')

const app               = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

module.exports = app