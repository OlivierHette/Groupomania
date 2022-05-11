const express       = require('express')
const router        = express.Router()

const commentCtrl   = require('../controllers/comments')

const auth          = require('../middleware/auth')


router.post('/:postId/comments', auth, commentCtrl.createComment)
router.get('/:postId/comments', auth, commentCtrl.getAllComments)
router.get('/:postId/comments/:id', auth, commentCtrl.getComment)
router.put('/:postId/comments/:id', auth, commentCtrl.modifyComment)
router.delete('/:postId/comments/:id', auth, commentCtrl.deleteComment)

router.delete('/admin/:postId/comments/:id', auth, commentCtrl.deleteCommentByAdmin)

module.exports = router