const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

// expose this function to our app using module.exports
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })

    passport.use(new LocalStrategy({
      passReqToCallback : true
    },
    async function(req, email, password, done) {

      // we are checking to see if the user trying to login already exists
      try {
        let user = await User.findOne({'local.username':  email })
        
        if (user) {
          console.log('user exists: ', user)
          if (!user.validPassword(password)) {
            return done(null, false)
          }
        } else {
          user = new User()
          user.local.username = email
          user.local.password = user.generateHash(password)
          user = await user.save()
        }
        
        return done(null, user)
      } catch(err) {
        console.log('error logging in: ', err)
        return done(err)
      }
    }))

}