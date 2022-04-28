const express = require('express')
const router = express.Router()

const commentCtrl = require('../controllers/comments')
const { route } = require('./user')

router.post('/:postId/comments', commentCtrl.createComment)
router.get('/:postId/comments', commentCtrl.getAllComments)

module.exports = router