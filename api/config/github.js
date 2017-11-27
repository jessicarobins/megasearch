const GitHubApi = require('github')

exports.instance = new GitHubApi({
  Promise: require('bluebird')
})
