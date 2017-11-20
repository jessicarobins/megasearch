export const confluence = {
  title(itemData) {
    return itemData.title
  },

  url(itemData, additionalData) {
    return `${additionalData.resourceUrl}${itemData.url}`
  },

  description(itemData) {
    return itemData.excerpt
  },

  items(data) {
    return data.results
  }
}