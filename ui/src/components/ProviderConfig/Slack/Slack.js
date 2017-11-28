import React, { Component } from 'react'
import { getToken } from '../../../services/Auth'

class Slack extends Component {

  render() {
    if (this.props.info) {
      return (
        <p className="provider-config-item">
          <i className="fa fa-slack provider-config-icon" aria-hidden="true"></i>
          <span>
            Linked to Slack team <strong>{this.props.info.organization}</strong>
          </span>
        </p>
      )
    }
    
    return (
      <div className="provider-link">
        <a
          className="button is-warning"
          href={`${process.env.REACT_APP_API_URL}users/auth/slack?jwt=${getToken()}`}>
          <i className="fa fa-slack provider-config-icon" aria-hidden="true"></i>
            Link Slack Account
        </a>
      </div>
    )
  }
}

export default Slack