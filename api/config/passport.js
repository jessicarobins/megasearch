const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

const jwtOptions = {  
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SESSION_SECRET
}

const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done) {
  try {
    const user = await User.findById(payload._id)
    return done(null, user)
  } catch(err) {
    console.log(err)
    return done(err, false)
  }
})

const localLogin = new LocalStrategy(async function(email, password, done) {  
  try {
    let user = await User.findOne({ email: email })
    
    if (user) {
      console.log('user exists: ', user)
      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err) }
        if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }) }
  
        return done(null, user)
      })
    } else {
      user = new User()
      user.local.username = email
      user.local.password = password
      user = await user.save()
    }
    
    return done(null, user)
  } catch(err) {
    console.log(err)
    done(null, false, err)
  }
})

passport.use(jwtLogin) 
passport.use(localLogin)