const mongoose = require('mongoose')
const Schema = mongoose.Schema

const providerSchema = new Schema({
  name: { type: 'String', required: true },
  id: { type: 'String', required: false },
  username: { type: 'String', required: false },
  password: { type: 'String', required: false },
  token: { type: 'String', required: false },
  refreshToken: { type: 'String', required: false },
  organization: { type: 'String', required: false }
})

module.exports = mongoose.model('Provider', providerSchema)