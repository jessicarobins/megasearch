import React, { Component } from 'react'

import './ProviderMenu.css'

class ProviderMenu extends Component {

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
