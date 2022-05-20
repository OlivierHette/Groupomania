const express   = require('express')
const router    = express.Router()

const auth      = require('../middleware/auth')
const multer    = require('../middleware/multer-config')

const postCtrl  = require('../controllers/post')

router.get('/', auth, postCtrl.getAllPosts)
router.get('/:id', auth, postCtrl.getPost)

router.post('/', auth, multer, postCtrl.createPost)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.delete('/:id', auth, postCtrl.deletePost)

router.delete('/admin/:id', auth, postCtrl.deletePostByAdmin)

module.exports = router