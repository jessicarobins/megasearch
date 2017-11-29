import React, { Component } from 'react'

import * as providers from '../../services/ProviderMap'

import './ProviderMenu.css'

class ProviderMenu extends Component {

  getIcon(providerName) {
    const info = providers[providerName]
    if (info && info.icon) {
      return info.icon
    }
  }

  render() {
    return (
      <div className="tabs is-toggle is-centered provider-menu">
        <ul>
          <li>
            <a href="#top">
              <span className="icon">
                <i className="fa fa-search"></i>
              </span>
              <span>search</span>
            </a>
          </li>
          {
            this.props.providers.map(({name}, i) => (
              <li key={i}>
                <a href={`#${name}`}>
                  {this.getIcon(name)}
                  {name}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default ProviderMenu
