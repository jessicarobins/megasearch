const jwt = require('jsonwebtoken')
const passport = require('passport')

const expiresIn = 10080

function generateToken(user) {  
  return jwt.sign(user, process.env.SESSION_SECRET, {
    expiresIn: expiresIn // in seconds
  })
}

function setUserInfo(request) {  
  return {
    _id: request._id,
    username: request.username
  }
}

exports.login = function(req, res, next) {

  const userInfo = setUserInfo(req.user)

  res.status(200).json({
    token: generateToken(userInfo),
    expiresIn: expiresIn,
    user: req.user.serialize()
  })
}

exports.authenticateSlack = function(req, res, next) {
  passport.authenticate(
    'slack', {
      session: false,
      scope: ['search:read'],
      callbackURL: `${process.env.REACT_APP_API_URL}users/auth/slack/callback?jwt=${req.query.jwt}`
    }
  ) (req, res, next)
}

exports.authorizeSlack = function(req, res, next) {
  passport.authorize(
    'slack', {
      session: false,
      scope: ['search:read'],
      callbackURL: `${process.env.REACT_APP_API_URL}users/auth/slack/callback?jwt=${req.query.jwt}`
    }
  ) (req, res, next)
}

exports.authorizeSlackCallback = async function(req, res) {
  const provider = {
    name: 'slack',
    token: req.account.accessToken,
    organization: req.account.team.name
  }

  try {
    await req.user.addProvider(provider)
  } catch(err) {
    console.log(err)
  }
  // TODO: make this dynamic
  res.redirect('http://megasearch2-jrobins.c9users.io/')
}


exports.authorizeGithub = function(req, res, next) {
  passport.authenticate(
    'github', {
      session: false,
      callbackURL: `${process.env.REACT_APP_API_URL}users/auth/github/callback?jwt=${req.query.jwt}`
    }
  ) (req, res, next)
}

exports.authorizeGithubCallback = async function(req, res) {
  const provider = {
    name: 'github',
    token: req.account.accessToken,
    id: req.account.profile.id,
    username: req.account.profile.username
  }

  try {
    await req.user.addProvider(provider)
  } catch(err) {
    console.log(err)
  }
  // TODO: make this dynamic
  res.redirect('http://megasearch2-jrobins.c9users.io/')
}

exports.updateGithubOrg = async function(req, res) {
  
  if (!req.user) {
    res.status(401).send('Unauthorized')
  }
  
  if (!req.body.organization) {
    res.status(422).send('Organization name is required.')
  }
  
  try {
    const provider = req.user.getProvider('github')
    provider.organization = req.body.organization
    const user = await req.user.save()
    res.json({
      user: user.serialize()
    })
  } catch(err) {
    console.log('this is the error: ', err)
    res.status(500).send(err)
  }
}