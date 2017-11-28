import React, { Component } from 'react'

import { getToken } from '../../services/Auth'
import Github from './Github/Github'

class ProviderConfig extends Component {
  
  getProviderInfo = (providerName) => {
    return this.props.userProviders.find(provider => provider.name === providerName)
  }
  
  render() {
    const slack = this.getProviderInfo('slack')
    return (
      <div className="box">
        <Github
          updateOrg={this.props.updateGithubOrg}
          info={this.getProviderInfo('github')} />
        {
          !slack &&
            <a href={`${process.env.REACT_APP_API_URL}users/auth/slack?jwt=${getToken()}`}>
              <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
            </a>
        }
      </div>
    )
  }
}

export default ProviderConfig