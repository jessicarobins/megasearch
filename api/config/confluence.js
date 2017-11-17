module.exports = {
  url: `https://${process.env.JIRA_ORG}.atlassian.net/wiki/rest/api/search`,
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_PASSWORD
}