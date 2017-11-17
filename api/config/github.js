const GitHubApi = require('github')

exports.instance = new GitHubApi({
  Promise: require('bluebird')
})

exports.config = {
  token: process.env.GH_TOKEN,
  org: process.env.GH_ORG
}