const express = require('express')
const router = express.Router()

const commentCtrl = require('../controllers/comments')

router.post('/:postId/comments', commentCtrl.createComment)
router.get('/:postId/comments', commentCtrl.getAllComments)
router.get('/:postId/comments/:id', commentCtrl.getComment)
router.put('/:postId/comments/:id', commentCtrl.modifyComment)
router.delete('/:postId/comments/:id', commentCtrl.deleteComment)

module.exports = router