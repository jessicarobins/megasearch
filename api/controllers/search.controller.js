const axios = require('axios')
const Promise = require('bluebird')

const jira = require('../config/jira')
const confluence = require('../config/confluence')
const github = require('../config/github')
const slack = require('../config/slack')

const { decrypt } = require('../services/crypto')

exports.jira = async function(req, res) {
  
  console.log('is this a thing? ', req.user)
  
  try {
    const response = await axios.request({
      method: 'GET',
      url: jira.url,
      auth: {
        username: jira.username,
        password: jira.password
      },
      params: {
        jql: `text~'${req.query.query}'`,
        fieldsByKeys: true
      }
    })

    res.json({
      additionalData: jira.additionalData,
      results: response.data.issues
    })

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

    res.json({
      additionalData: confluence.additionalData,
      results: response.data.results
    })
  } catch(err) {
    console.log('error: ', err)
    res.sendStatus(500).json({error: err})
  }
}

exports.github = async function(req, res) {
  
  const decryptedToken = decrypt(req.user.getProviderToken('github'))
  
  try {
    github.instance.authenticate({
      type: 'oauth',
      token: decryptedToken
    })

    const q = `org:${github.config.org} ${req.query.query}`

    const response = await Promise.props({
      issues: github.instance.search.issues({q}),
      code: github.instance.search.code({
        q, 
        headers: {
          'accept': 'application/vnd.github.v3.text-match+json'
        }
      }),
      commits: github.instance.search.commits({q})
    })

    res.json({results: response})
  } catch(err) {
    console.log('error: ', err)
    res.sendStatus(500).json({error: err})
  }
}

exports.slack = async function(req, res) {
  try {
    const response = await slack.search.all({
      query: req.query.query
    })

    res.json({results: response})
  } catch(err) {
    console.log('error: ', err)
    res.sendStatus(500).json({error: err})
  }
}
