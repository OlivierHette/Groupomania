const express   = require('express')
const router    = express.Router()

const userCtrl  = require('../controllers/user')

const auth      = require('../middleware/auth')


router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/user/:id', auth, userCtrl.getUser)
router.put('/user/:id', auth, userCtrl.modifyUser)
router.delete('/user/:id', auth, userCtrl.deleteUser)

router.get('/admin/users/:id', auth, userCtrl.getAllUsersByAdmin)
router.put('/admin/users/:id', auth, userCtrl.modifyUserRole)

module.exports = router