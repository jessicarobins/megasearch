const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const GitHubStrategy = require('passport-github').Strategy
const SlackStrategy = require('@aoberoi/passport-slack').default.Strategy

const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

const jwtFromHeaderOptions = {  
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SESSION_SECRET
}

const jwtFromParamOptions = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('jwt'),
  secretOrKey: process.env.SESSION_SECRET
}

const jwtCallback = async function(payload, done) {
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
}

const jwtLoginFromHeaders = new JwtStrategy(jwtFromHeaderOptions, jwtCallback)

const jwtLoginFromParam = new JwtStrategy(jwtFromParamOptions, jwtCallback)

const localLogin = new LocalStrategy(async function(username, password, done) {  
  
  try {
    let user = await User.findOne({ username: username })
    
    if (user) {
      console.log('user exists')
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

const githubLogin = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://megasearch2-jrobins.c9users.io:8081/users/auth/github/callback",
    passReqToCallback: true,
    scope: 'repo'
  },
  function(req, accessToken, refreshToken, profile, done) {
    return done(null, { accessToken, refreshToken, profile })
  }
)

const slackLogin = new SlackStrategy({
  clientID: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  skipUserProfile: true,
  scope: ['search:read'],
  passReqToCallback: true,
  callbackURL: `${process.env.REACT_APP_API_URL}users/auth/slack/callback`
}, (req, accessToken, scopes, team, botData, profile, done) => {
  done(null, {accessToken, team})
})

passport.use('jwt', jwtLoginFromHeaders)
passport.use('jwt-param', jwtLoginFromParam)
passport.use(localLogin)
passport.use(githubLogin)
passport.use(slackLogin)
