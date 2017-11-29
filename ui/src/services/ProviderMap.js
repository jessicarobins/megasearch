import React from 'react'
import Highlighter from 'react-highlight-words'

export const atlassian = {
  icon: <i className="devicon-confluence-plain provider-config-icon" aria-hidden="true"></i>,

  count(data) {
    return ((data.confluence && data.jira) ?
      data.confluence.response.totalSize +
      data.jira.response.total : null)
  },

  sections: {
    confluence: {
      title(itemData, searchTerm) {
        return highlight(itemData.title, searchTerm)
      },

      url(itemData, additionalData) {
        return `${additionalData.resourceUrl}${itemData.url}`
      },

      summary(itemData, searchTerm) {
        return highlight(itemData.excerpt, searchTerm)
      },

      items(data) {
        return data.confluence.response.results
      },
      
      additionalData(data) {
        return data.confluence.additionalData
      }
    },

    jira: {
      title(itemData, searchTerm) {
        return highlight(`${itemData.key} ${itemData.fields.summary}`, searchTerm)
      },

      url(itemData, additionalData) {
        return `${additionalData.resourceUrl}/${itemData.key}`
      },

      summary(itemData, searchTerm) {
        return highlight(itemData.fields.description, searchTerm)
      },

      items(data) {
        return data.jira.response.issues
      },
      
      additionalData(data) {
        return data.jira.additionalData
      }
    }
  }
}

export const slack = {
  icon: <i className="fa fa-slack provider-config-icon" aria-hidden="true"></i>,

  count(data) {
    return !!data.results ?
      data.results.files.total + data.results.messages.total :
      null
  },

  sections: {
    files: {
      title(itemData, searchTerm) {
        return highlight(itemData.title, searchTerm)
      },

      url(itemData) {
        return itemData.permalink
      },

      summary(itemData, searchTerm) {
        return itemData.initial_comment && highlight(itemData.initial_comment.comment, searchTerm)
      },

      items(data) {
        return data.results.files.matches
      },
      
      additionalData() {
        return
      }
    },

    messages: {
      title(itemData, searchTerm) {

        let message

        if (itemData.type === 'message') {
          message = `${itemData.username} in #${itemData.channel.name}`
        }

        message = `${itemData.username} in a direct message`

        return highlight(message, searchTerm)
      },

      url(itemData) {
        return itemData.permalink
      },

      summary(itemData, searchTerm) {
        return (
          <div>
            <p>{highlight(itemData.text, searchTerm)}</p>
            {
              itemData.attachments && itemData.attachments.map( (attachment, i) => (
                <div key={i}>
                  <p>{highlight(attachment.author_name, searchTerm)}</p>
                  <p>{highlight(attachment.pretext, searchTerm)}</p>
                  {
                    attachment.title &&
                      <a href={attachment.title_link} target="_blank">
                        {highlight(attachment.title, searchTerm)}
                      </a>
                  }
                  <p>{highlight(attachment.text, searchTerm)}</p>
                </div>
              ))
            }
          </div>
        )
      },

      items(data) {
        return data.results.messages.matches
      },
      
      additionalData() {
        return
      }
    }
  } 
}

export const github = {
  icon: <i className="fa fa-github provider-config-icon" aria-hidden="true"></i>,

  count(data) {
    return !!data.results ?
      data.results.code.data.total_count +
      data.results.commits.data.total_count +
      data.results.issues.data.total_count :
      null
  },

  sections: {
    code: {
      title(itemData, searchTerm) {
        return highlight(itemData.name, searchTerm)
      },

      url(itemData) {
        return itemData.html_url
      },

      summary(itemData, searchTerm) {
        return (
          <div>
            <a href={itemData.repository.html_url} target="_blank">
              {highlight(itemData.repository.name, searchTerm)}
            </a>
            {
              itemData.text_matches.map((match, i) => (
                <div key={i} className="box">
                  <code>
                    {highlight(match.fragment, searchTerm)}
                  </code>
                </div>
              ))
            }
          </div>
        )
      },

      items(data) {
        return data.results.code.data.items
      },
      
      additionalData() {
        return
      }
    },

    commits: {
      title(itemData, searchTerm) {
        return highlight(itemData.commit.message, searchTerm)
      },

      url(itemData) {
        return itemData.html_url
      },

      summary(itemData, searchTerm) {
        return (
          <a href={itemData.repository.html_url} target="_blank">
            {highlight(itemData.repository.name, searchTerm)}
          </a>
        )
      },

      items(data) {
        return data.results.commits.data.items
      },
      
      additionalData() {
        return
      }
    },

    prs: {
      title(itemData, searchTerm) {
        return highlight(itemData.title, searchTerm)
      },

      url(itemData) {
        return itemData.html_url
      },

      summary(itemData, searchTerm) {
        return highlight(itemData.body, searchTerm)
      },

      items(data) {
        return data.results.issues.data.items
      },
      
      additionalData() {
        return
      }
    }
  } 
}

const highlight = function(text, searchTerm) {
  if (!text || !searchTerm) return null

  return (
    <Highlighter
      highlightClassName='highlighted'
      searchWords={[searchTerm, ...searchTerm.split(' ')]}
      autoEscape={true}
      textToHighlight={text} />
  )
}
