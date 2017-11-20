import React, { Component } from 'react'
import SearchResult from '../SearchResult/SearchResult'
import * as providers from '../../services/ProviderMap'

class SearchResults extends Component {

  renderLoading() {
    return (
      <div className="level">
        <span className="sr-only">Loading...</span>
        <i className="level-item fa fa-spinner fa-pulse fa-2x fa-fw"></i>
      </div>
    )
  }

  renderResults = () => {
    const providerMapping = providers[this.props.provider]
    return (
      <div>
      {
        providerMapping.items(this.props.data).map((item, i) => {
          return <SearchResult
            key={i}
            url={providerMapping.url(item, this.props.data.additionalData)}
            title={providerMapping.title(item)}
            description={providerMapping.description(item)} />
        })
      }
      </div>
    )
  }

  render() {
    if (!this.props.data) return null

    return (
      <div className="tile is-child message">
        <div className="message-header">
          <p>{this.props.provider}</p>
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
