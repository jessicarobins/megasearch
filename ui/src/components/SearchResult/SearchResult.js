import React, { Component } from 'react'

class SearchResult extends Component {

  render() {
    return (
      <div className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>
                <a href={this.props.url} target="_blank">{this.props.title}</a>
              </strong>
            </p>
            <p className="is-size-7">{this.props.summary}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResult
