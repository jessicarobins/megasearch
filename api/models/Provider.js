const mongoose = require('mongoose')
const Schema = mongoose.Schema

const providerSchema = new Schema({
  name: { type: 'String', required: true },
  id: { type: 'String', required: true },
  token: { type: 'String', required: true },
  refreshToken: { type: 'String', required: false }
})

module.exports = mongoose.model('Provider', providerSchema)