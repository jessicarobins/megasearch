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
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  } catch(err) {
    console.log(err)
    return done(err, false)
  }
})

const localLogin = new LocalStrategy(async function(username, password, done) {  
  
  try {
    let user = await User.findOne({ username: username })
    
    if (user) {
      console.log('user exists: ', user)
      const isMatch = await user.comparePassword(password)
      
      if (!isMatch) {
        return done(null, false, {
          error: "Your login details could not be verified. Please try again."
        })
      }
      
      return done(null, user)
    } else {
      console.log('creating a new user')
      user = new User()
      user.username = username
      user.password = password
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