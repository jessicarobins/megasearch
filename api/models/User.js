const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Provider = require('./Provider')
const { encrypt } = require('../services/crypto')

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
  
  const encryptedToken = encrypt(providerData.token)
  
  // if provider exists already
  let provider = user.providers.find(provider => provider.name === providerData.name)
  if (provider) {
    provider.token = encryptedToken
    provider.id = providerData.id
    provider.refreshToken = providerData.refreshToken,
    provider.username = providerData.username
    
    if (providerData.organization) {
      provider.organization = providerData.organization
    }
  } else {
    provider = {
      name: providerData.name,
      id: providerData.id,
      token: encryptedToken,
      refreshToken: providerData.refreshToken,
      username: providerData.username,
      organization: providerData.organization
    }
    
    user.providers.push(provider)
  }
  
  return user.save()
}

userSchema.methods.getProviderToken = function(providerName) {
  const provider = this.getProvider(providerName)
  return provider.token
}

userSchema.methods.serialize = function() {
  return {
    username: this.username,
    providers: this.providers.map(provider => ({
      name: provider.name,
      username: provider.username,
      organization: provider.organization
    }))
  }
}

userSchema.methods.getProvider = function(providerName) {
  return this.providers.find(provider => provider.name == providerName)
}

module.exports = mongoose.model('User', userSchema)
