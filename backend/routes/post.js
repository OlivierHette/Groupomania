const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')

router.post('/', postCtrl.createPost)
router.get('/', postCtrl.getAllPosts)
router.get('/:id', postCtrl.getPost)
router.put('/:id', postCtrl.modifyPost)
router.delete('/:id', postCtrl.deletePost)
router.delete('/admin/:id', postCtrl.deletePostByAdmin)

module.exports = router