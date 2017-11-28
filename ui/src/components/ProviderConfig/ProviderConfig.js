import React, { Component } from 'react'

import Github from './Github/Github'
import Slack from './Slack/Slack'

class ProviderConfig extends Component {
  
  getProviderInfo = (providerName) => {
    return this.props.userProviders.find(provider => provider.name === providerName)
  }
  
  render() {
    return (
      <div className="box">
        <Github
          updateOrg={this.props.updateGithubOrg}
          info={this.getProviderInfo('github')} />
        <Slack
          info={this.getProviderInfo('slack')} />
      </div>
    )
  }
}

export default ProviderConfig