const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')

router.post('/', postCtrl.createPost)
router.get('/', postCtrl.getAllPosts)

module.exports = router