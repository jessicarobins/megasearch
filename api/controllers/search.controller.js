const axios = require('axios')
const jira = require('../config/jira')
const confluence = require('../config/confluence')

exports.jira = async function(req, res) {
  
  try {
    const response = await axios.request({
      method: 'GET',
      url: jira.url,
      auth: {
        username: jira.username,
        password: jira.password
      },
      params: {
        jql: `text~'${req.query.query}'`
      }
    })

    res.json({results: response.data.issues})
  } catch(err) {
    res.sendStatus(500).json({error: err})
  }
}

exports.confluence = async function(req, res) {
  try {
    const response = await axios.request({
      method: 'GET',
      url: confluence.url,
      auth: {
        username: confluence.username,
        password: confluence.password
      },
      params: {
        cql: `text~'${req.query.query}' OR title~'${req.query.query}'`
      }
    })

    res.json({results: response.data})
  } catch(err) {
    console.log('error: ', err)
    res.sendStatus(500).json({error: err})
  }
}