const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/user/:id', userCtrl.getUser)
router.put('/user/:id', userCtrl.modifyUser)
router.delete('/user/:id', userCtrl.deleteUser)


module.exports = router