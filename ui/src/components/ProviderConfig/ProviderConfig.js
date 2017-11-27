import React, { Component } from 'react'
import { getToken } from '../../services/Auth'

class ProviderConfig extends Component {
  
  github() {
    const info = this.props.userProviders.find(provider => provider.name === 'github')
    if (info) {
      return <div>Linked to Github as {info.username}</div>
    }
    
    return (
      <a
        href={`${process.env.REACT_APP_API_URL}users/auth/github?token=${getToken()}`}
        className="button">
        Link Github Account
      </a>
    )
  }

  render() {
    return (
      <div>
        {this.github()}
      </div>
    )
  }
}

export default ProviderConfig