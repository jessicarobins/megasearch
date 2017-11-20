export const confluence = {
  title(itemData) {
    return itemData.title
  },

  url(itemData, additionalData) {
    return `${additionalData.resourceUrl}${itemData.url}`
  },

  summary(itemData) {
    return itemData.excerpt
  },

  items(data) {
    return data.results
  },

  count(data) {
    return !!data.results ? data.results.length : null
  }
}

export const jira = {
  title(itemData) {
    return `${itemData.key} ${itemData.fields.summary}`
  },

  url(itemData, additionalData) {
    return `${additionalData.resourceUrl}${itemData.key}`
  },

  summary(itemData) {
    return itemData.fields.description
  },

  items(data) {
    return data.results
  },

  count(data) {
    return !!data.results ? data.results.length : null
  }
}