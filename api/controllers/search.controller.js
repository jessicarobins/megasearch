const axios = require('axios')
const Promise = require('bluebird')
const slack = require('slack')
const GitHubApi = require('github')

const { decrypt } = require('../services/crypto')

const github = new GitHubApi({
  Promise: require('bluebird')
})

exports.jira = async function(req, res) {
  
  if (!req.user) {
    res.status(401).send('Unauthorized')
  }
  
  const providerInfo = req.user.getProvider('atlassian')
  
  if (!providerInfo) {
    res.status(401).send('Unauthorized')
  }
  
  const { username, password, organization } = providerInfo
  const decryptedPassword = decrypt(password)

  try {
    const response = await axios.request({
      method: 'GET',
      url: `https://${organization}.atlassian.net/rest/api/2/search`,
      auth: {
        username: username,
        password: decryptedPassword
      },
      params: {
        jql: `text~'${req.query.query}'`,
        fieldsByKeys: true
      }
    })

    res.json({
      additionalData: {
        resourceUrl: `https://${organization}.atlassian.net/browse`
      },
      results: response.data.issues
    })

  } catch(err) {
    console.log('error: ', err)
    res.status(500).send('Something has gone wrong')
  }
}

exports.confluence = async function(req, res) {
  if (!req.user) {
    res.status(401).send('Unauthorized')
  }
  
  const providerInfo = req.user.getProvider('atlassian')
  
  if (!providerInfo) {
    res.status(401).send('Unauthorized')
  }
  
  const { username, password, organization } = providerInfo
  const decryptedPassword = decrypt(password)

  try {
    const response = await axios.request({
      method: 'GET',
      url: `https://${organization}.atlassian.net/wiki/rest/api/search`,
      auth: {
        username: username,
        password: decryptedPassword
      },
      params: {
        cql: `text~'${req.query.query}' OR title~'${req.query.query}'`
      }
    })

    res.json({
      additionalData: {
        resourceUrl: `https://${organization}.atlassian.net/browse`
      },
      results: response.data.results
    })
  } catch(err) {
    console.log('error: ', err)
    res.status(500).send('Something has gone wrong')
  }
}

exports.github = async function(req, res) {
  
  const decryptedToken = req.user.getProviderToken('github')
  
  if (!decryptedToken) {
    res.status(401).send('Unauthorized')
  }
  
  try {
    github.authenticate({
      type: 'oauth',
      token: decryptedToken
    })

    let q = req.query.query
    
    const { organization } = req.user.getProvider('github')
    if (organization) {
      q = `org:${organization} ${q}`
    }  

    const response = await Promise.props({
      issues: github.search.issues({q}),
      code: github.search.code({
        q, 
        headers: {
          'accept': 'application/vnd.github.v3.text-match+json'
        }
      }),
      commits: github.search.commits({q})
    })

    res.json({results: response})
  } catch(err) {
    console.log('error: ', err)
    res.sendStatus(500).json({error: err})
  }
}

exports.slack = async function(req, res) {
  
  const decryptedToken = req.user.getProviderToken('slack')

  if (!decryptedToken) {
    res.status(401).send('Unauthorized')
  }

  try {
    const response = await slack.search.all({
      query: req.query.query,
      token: decryptedToken
    })

    res.json({results: response})
  } catch(err) {
    console.log('error: ', err)
    res.sendStatus(500).json({error: err})
  }
}
