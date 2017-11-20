import React, { Component } from 'react'

class SearchResult extends Component {

  render() {
    return (
      <div className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>
                <a href={this.props.url}>{this.props.title}</a>
              </strong>
            </p>
            <p>{this.props.description}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResult
