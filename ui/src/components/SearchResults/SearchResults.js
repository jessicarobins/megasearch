import React, { Component } from 'react'
import SearchResult from '../SearchResult/SearchResult'
import * as providers from '../../services/ProviderMap'

class SearchResults extends Component {

  constructor(props) {
    super(props)

    this.providerMapping = providers[props.provider]
  }

  renderLoading() {
    return (
      <div className="level">
        <span className="sr-only">Loading...</span>
        <i className="level-item fa fa-spinner fa-pulse fa-2x fa-fw"></i>
      </div>
    )
  }

  renderResults = () => {
    return (
      <div>
      {
        Object.entries(this.providerMapping.sections).map(([name, section]) => {
          return section.items(this.props.data).map((item, i) => {
            return <SearchResult
              key={i}
              url={section.url(item, this.props.data.additionalData)}
              title={section.title(item)}
              summary={section.summary(item)} />
          })
        })
      }
      </div>
    )
  }

  renderCount = () => {
    return <span>
      ({this.providerMapping.count(this.props.data)} results)
    </span>
  }

  render() {
    if (!this.props.data) return null

    return (
      <div className="tile is-child message">
        <div className="message-header">
          <p>{this.props.provider} {this.renderCount()}</p>
        </div>
        <div className="message-body">
        {
          this.props.data.loading ? this.renderLoading() : this.renderResults()
        }
        </div>
      </div>
    )
  }
}

export default SearchResults
