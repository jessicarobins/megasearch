const token = process.env.SLACK_TOKEN
const Slack = require('slack')
module.exports = new Slack({token})
