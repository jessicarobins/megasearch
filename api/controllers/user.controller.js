const jwt = require('jsonwebtoken')

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
    user: userInfo
  })
}