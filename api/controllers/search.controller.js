const axios = require('axios')
const jiraConfig = require('../config/jira')

exports.jira = async function(req, res) {
  const response = await axios.request({
    method: 'GET',
    url: jiraConfig.url,
    auth: {
      username: jiraConfig.username,
      password: jiraConfig.password
    },
    params: {
      jql: `text~'${req.query.query}'`
    }
  })

  res.json({results: response.data.issues})
}