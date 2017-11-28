const express = require('express')
const passport = require('passport')
const router = express.Router()

const UserController = require('../controllers/user.controller')
 
const requireLogin = passport.authenticate('local', { session: false })
const requireJwt = passport.authenticate('jwt', { session: false })
const requireJwtParam = passport.authenticate('jwt-param', { session: false })

router.post('/login', requireLogin, UserController.login)

// github oauth
router.get('/auth/github', requireJwtParam, UserController.authorizeGithub)
router.get('/auth/github/callback', 
  requireJwtParam,
  passport.authorize('github', { session: false }),
  UserController.authorizeGithubCallback)

// slack oauth
// router.get('/auth/slack', requireJwtParam, UserController.authorizeSlack)
// router.get('/auth/slack/callback',
//   requireJwtParam,
//   passport.authorize('slack', { session: false }),
//   UserController.authorizeSlackCallback
// )

router.get('/auth/slack', requireJwtParam, UserController.authorizeSlack)
router.get('/auth/slack/callback',
  requireJwtParam,
  UserController.authorizeSlack,
  function(req, res) {
    console.log('hello')
    // Successful authentication, redirect home.
    res.redirect('http://megasearch2-jrobins.c9users.io/')
  })
  
router.get('/refresh', requireJwt, UserController.login)
router.put('/github/organization', requireJwt, UserController.updateGithubOrg)


module.exports = router
