module.exports = {
  confluence: {
    url: function(org) {
      return `https://${org}.atlassian.net/wiki/rest/api/search`
    },
    resourceUrl: function(org) {
      return `https://${process.env.JIRA_ORG}.atlassian.net/wiki`
    }
  },
  jira: {
    url: function(org) {
      return `https://${org}.atlassian.net/rest/api/2/search`
    },
    resourceUrl: function(org) {
      return `https://${org}.atlassian.net/browse`
    }
  }
}