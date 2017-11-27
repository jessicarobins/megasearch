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

exports.authorizeGithub = function(req, res, next) {
  passport.authenticate(
    'github', {
      session: false,
      callbackURL: `${process.env.REACT_APP_API_URL}users/auth/github/callback?token=${req.query.token}`
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