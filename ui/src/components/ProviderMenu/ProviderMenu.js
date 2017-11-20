import React, { Component } from 'react'

import './ProviderMenu.css'

class ProviderMenu extends Component {

  render() {
    return (
      <div className="tabs is-toggle is-centered provider-menu">
        <ul>
        {
          this.props.providers.map((provider, i) => (
            <li key={i}>
              <a href={`#${provider}`}>{provider}</a>
            </li>
          ))
        }
        </ul>
      </div>
    )
  }
}

export default ProviderMenu
