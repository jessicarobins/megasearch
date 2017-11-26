import React, { Component } from 'react'
import { getToken } from '../../services/Auth'

class ProviderConfig extends Component {

  render() {
    return (
      <div>
        <a
          href={`http://megasearch2-jrobins.c9users.io:8081/users/auth/github?token=${getToken()}`}
          className="button">link github account</a>
      </div>
    )
  }
}

export default ProviderConfig