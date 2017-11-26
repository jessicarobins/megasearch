const express = require('express')
const passport = require('passport')
const router = express.Router()

const UserController = require('../controllers/user.controller')
 
const requireLogin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })

router.post('/login', requireLogin, UserController.login)

router.get('/auth/github', 
  passport.authenticate('jwt-param', { session: false }),
  function(req, res, next) {
    console.log('wht is req.params ', req.query)
    passport.authenticate(
      'github', {
        session: false,
        callbackURL: `http://megasearch2-jrobins.c9users.io:8081/users/auth/github/callback?token=${req.query.token}`
      }
    ) (req,res,next)
})

// router.get('/auth/github',
//   passport.authenticate('jwt-param', { session: false }),
//   passport.authenticate('github', { session: false }), function(req, res) {
//     console.log('this is the top function')
//     console.log('do we have a user? ', req.user)
//     console.log('and what is in account ', req.account)
//   })
router.get('/auth/github/callback', 
  passport.authenticate('jwt-param', { session: false }),
  passport.authorize('github', { session: false }),
  function(req, res) {
    console.log('and this is the bottom')
    console.log('do we have a user? ', req.user)
    console.log('and what is in account ', req.account)
    console.log('redirecting home')
    // Successful authentication, redirect home.
    res.redirect('/');
  })

module.exports = router
