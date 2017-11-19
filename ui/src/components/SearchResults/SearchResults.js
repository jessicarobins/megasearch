import React, { Component } from 'react'

class SearchResults extends Component {

  renderLoading() {
    return (
      <div className="level">
        <span class="sr-only">Loading...</span>
        <i className="level-item fa fa-spinner fa-pulse fa-2x fa-fw"></i>
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
            this.props.data.loading ? this.renderLoading() : 'Loaded!'}
        </div>
      </div>
    )
  }
}

export default SearchResults
