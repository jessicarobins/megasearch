const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  github: {
    id: String,
    token: String,
    org: String
  }
})

// Pre-save of user to database, hash password if password is modified or new
userSchema.pre('save', async function(next) {  
  const user = this
  const SALT_FACTOR = 5

  if (!user.isModified('password')) return next()
  
  try {
    user.password = await bcrypt.hash(user.password, SALT_FACTOR)
    next()
  } catch(err) {
    next(err)
  }
})

userSchema.methods.comparePassword = function(candidatePassword) {  
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
