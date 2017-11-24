const express = require('express')
const passport = require('passport')
const router = express.Router()

const UserController = require('../controllers/user.controller')
 
const requireLogin = passport.authenticate('local', { session: false })

router.post('/login', requireLogin, UserController.login)

module.exports = router
