import React, { Component } from 'react'

class Slack extends Component {

  render() {
    
    return (
      <div className="provider-local">
        <h5 className="title is-5">
          Logged in as {this.props.username}
        </h5>
        <button
          onClick={this.props.logout}
          className="button is-dark is-small">
          Log Out
        </button>
      </div>
    )
  }
}

export default Slack