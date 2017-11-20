module.exports = {
  url: `https://${process.env.JIRA_ORG}.atlassian.net/rest/api/2/search`,
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_PASSWORD,
  additionalData: {
    resourceUrl: `https://${process.env.JIRA_ORG}.atlassian.net/browse/`
  }
}