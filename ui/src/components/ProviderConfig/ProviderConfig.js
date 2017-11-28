import React, { Component } from 'react'

import Github from './Github/Github'
import Local from './Local/Local'
import Slack from './Slack/Slack'

import './ProviderConfig.css'

class ProviderConfig extends Component {
  
  getProviderInfo = (providerName) => {
    return this.props.userProviders.find(provider => provider.name === providerName)
  }
  
  render() {
    return (
      <div className="box provider-config">
        <Local
          logout={this.props.logout}
          username={this.props.username} />
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