const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Provider = require('./Provider')

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
  providers: [Provider.schema]
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

userSchema.methods.addProvider = function(providerData) {
  const user = this
  
  // if provider exists already
  let provider = user.providers.find(provider => provider.name === providerData.name)
  if (provider) {
    provider.token = providerData.token
    provider.id = providerData.id
    provider.refreshToken = providerData.refreshToken
  } else {
    provider = {
      name: providerData.name,
      id: providerData.id,
      token: providerData.token,
      refreshToken: providerData.refreshToken
    }
    
    user.providers.push(provider)
  }
  
  return user.save()
}

module.exports = mongoose.model('User', userSchema)
