const axios = require('axios')
const jiraConfig = require('../config/jira')

exports.jira = function() {
  const { data } = axios.request({
    method: 'GET',
    url: jiraConfig.url,
    auth: {
      username: jiraConfig.username,
      password: jiraConfig.password
    }
  })

  res.json({data})
}