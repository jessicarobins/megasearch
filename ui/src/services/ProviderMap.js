import React from 'react'

export const confluence = {
  count(data) {
    return !!data.results ? data.results.length : null
  },

  sections: {
    wiki: {
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
      }
    }
  }
}

export const jira = {
  count(data) {
    return !!data.results ? data.results.length : null
  },

  sections: {
    tickets: {
      title(itemData) {
        return `${itemData.key} ${itemData.fields.summary}`
      },

      url(itemData, additionalData) {
        return `${additionalData.resourceUrl}/${itemData.key}`
      },

      summary(itemData) {
        return itemData.fields.description
      },

      items(data) {
        return data.results
      }
    }
  } 
}

export const slack = {
  count(data) {
    return !!data.results ?
      data.results.files.total + data.results.messages.total :
      null
  },

  sections: {
    files: {
      title(itemData) {
        return itemData.title
      },

      url(itemData) {
        return itemData.permalink
      },

      summary(itemData) {
        return
      },

      items(data) {
        return data.results.files.matches
      }
    },

    messages: {
      title(itemData) {
        if (itemData.type === 'message') {
          return `${itemData.username} in #${itemData.channel.name}`
        }

        return `${itemData.username} in a direct message`
      },

      url(itemData) {
        return itemData.permalink
      },

      summary(itemData) {
        return (
          <div>
            <p>{itemData.text}</p>
            {
              itemData.attachments && itemData.attachments.map( (attachment, i) => (
                <div key={i}>
                  <p>{attachment.author_name}</p>
                  <p>{attachment.pretext}</p>
                  {
                    attachment.title && <a href={attachment.title_link} target="_blank">{attachment.title}</a>
                  }
                  <p>{attachment.text}</p>
                </div>
              ))
            }
          </div>
        )
      },

      items(data) {
        return data.results.messages.matches
      }
    }
  } 
}

export const github = {
  count(data) {
    return !!data.results ?
      data.results.code.data.total_count +
      data.results.commits.data.total_count +
      data.results.issues.data.total_count :
      null
  },

  sections: {
    code: {
      title(itemData) {
        return itemData.name
      },

      url(itemData) {
        return itemData.html_url
      },

      summary(itemData) {
        return (
          <div>
            <a href={itemData.repository.html_url}>{itemData.repository.name}</a>
            {
              itemData.text_matches.map((match, i) => (
                <div key={i} className="box">
                  <code>
                    {match.fragment}
                  </code>
                </div>
              ))
            }
          </div>
        )
      },

      items(data) {
        return data.results.code.data.items
      }
    },

    commits: {
      title(itemData) {
        return itemData.commit.message
      },

      url(itemData) {
        return itemData.html_url
      },

      summary(itemData) {
        return <a href={itemData.repository.html_url}>{itemData.repository.name}</a>
      },

      items(data) {
        return data.results.commits.data.items
      }
    },

    prs: {
      title(itemData) {
        return itemData.title
      },

      url(itemData) {
        return itemData.html_url
      },

      summary(itemData) {
        return itemData.body
      },

      items(data) {
        return data.results.issues.data.items
      }
    }
  } 
}