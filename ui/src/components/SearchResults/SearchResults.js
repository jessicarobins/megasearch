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
          return (
            <div
              className="media"
              key={name}>
              <div className="media-left image is-96x96">
                {name}
              </div>
              <div className="media-content">
                <div className="content">
                  {
                     section.items(this.props.data).map((item, i) => {
                     const additionalData = section.additionalData(this.props.data)
                      return (
                        <SearchResult
                          searchTerm={this.props.searchTerm}
                          key={i}
                          url={section.url(item, additionalData)}
                          title={section.title(item, this.props.searchTerm)}
                          summary={section.summary(item, this.props.searchTerm)} />
                      )
                    })
                  }
                </div>
              </div>
            </div>
          )
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
    if (!this.props.data || !this.providerMapping) return null

    return (
      <div
        id={this.props.provider}
        className="tile is-child message">
        <div className="message-header">
          <p>{this.providerMapping.icon} {this.props.provider} {this.renderCount()}</p>
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
