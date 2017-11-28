const jwt = require('jsonwebtoken')
const passport = require('passport')
const axios = require('axios')

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

exports.addAtlassian = async function(req, res) {
  if (!req.user) {
    res.status(401).send('Unauthorized')
  }
  
  const { username, password, organization } = req.body
  
  if (!username || !password || !organization) {
    res.status(422).send('All fields are required')
  }

  try {
    const response = await axios.request({
      method: 'GET',
      url: `https://${organization}.atlassian.net/rest/api/2/myself`,
      auth: {
        username: username,
        password: password
      }
    })
    
    const provider = {
      name: 'atlassian',
      password: password,
      username: username,
      id: response.data.accountId,
      organization: organization
    }

    const user = await req.user.addProvider(provider)
    res.status(200).json(user.serialize())

  } catch(err) {
    console.log(err)
    res.status(401).send('Username and/or password is incorrect.')
  }
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
    id: req.account.team.id,
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