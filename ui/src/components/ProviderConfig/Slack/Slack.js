import React, { Component } from 'react'
import { getToken } from '../../../services/Auth'

class Slack extends Component {

  render() {
    if (this.props.info) {
      return (
        <div>
          <p>Linked to Slack team <strong>{this.props.info.organization}</strong></p>
        </div>
      )
    }
    
    return (
      <a href={`${process.env.REACT_APP_API_URL}users/auth/slack?jwt=${getToken()}`}>
        <img
          alt="Add to Slack" height="40" width="139"
          src="https://platform.slack-edge.com/img/add_to_slack.png"
          srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
      </a>
    )
  }
}

export default Slack