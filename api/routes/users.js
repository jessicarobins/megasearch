const express = require('express')
const passport = require('passport')
const router = express.Router()

const UserController = require('../controllers/user.controller')
 
const requireLogin = passport.authenticate('local', { session: false })
const requireJwt = passport.authenticate('jwt', { session: false })
const requireJwtParam = passport.authenticate('jwt-param', { session: false })

router.post('/login', requireLogin, UserController.login)

router.get('/auth/github', requireJwtParam, UserController.authorizeGithub)

router.get('/auth/github/callback', 
  requireJwtParam,
  passport.authorize('github', { session: false }),
  UserController.authorizeGithubCallback)

router.get('/refresh', requireJwt, UserController.login)

module.exports = router
