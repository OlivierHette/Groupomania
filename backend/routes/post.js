const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, postCtrl.createPost)
router.get('/', auth, postCtrl.getAllPosts)
router.get('/:id', auth, postCtrl.getPost)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.delete('/:id', auth, postCtrl.deletePost)
router.delete('/admin/:id', auth, postCtrl.deletePostByAdmin)

module.exports = router