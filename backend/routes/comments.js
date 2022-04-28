const express = require('express')
const router = express.Router()

const commentCtrl = require('../controllers/comments')
const { route } = require('./user')

router.post('/:postId/comments', commentCtrl.createComment)

module.exports = router