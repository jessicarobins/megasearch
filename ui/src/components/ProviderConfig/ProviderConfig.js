import React, { Component } from 'react'
import { getToken } from '../../services/Auth'

class ProviderConfig extends Component {

  render() {
    return (
      <div>
        <a
          href={`${process.env.REACT_APP_API_URL}users/auth/github?token=${getToken()}`}
          className="button">link github account</a>
      </div>
    )
  }
}

export default ProviderConfig