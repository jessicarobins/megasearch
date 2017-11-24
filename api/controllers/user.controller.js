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
    email: request.email
  }
}

exports.login = function(req, res, next) {

  const userInfo = setUserInfo(req.user)

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    expiresIn: expiresIn,
    user: userInfo
  })
}