import React, { Component } from 'react'
import { getToken } from '../../../services/Auth'

class Github extends Component {
  
  handleOrgFormSubmit = (e) => {
    e.preventDefault()
    
    if (this.input.value) {
      this.props.updateOrg(this.input.value)
    }
  }
  
  renderOrgForm() {
    return (
      <form onSubmit={this.handleOrgFormSubmit}>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Organization</label>
          </div>
          <div className="field-body">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  ref={(input) => this.input = input}
                  className="input"
                  type="text"
                  placeholder="Organization" />
              </div>
              <div className="control">
                <button
                  type="submit"
                  className="button is-dark">Add</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }

  render() {
    if (this.props.info) {
      return (
        <div>
          <p>Linked to Github as <strong>{this.props.info.username}</strong></p>
          {
            this.props.info.organization ?
              <p>Using organization <strong>{this.props.info.organization}</strong></p> :
              this.renderOrgForm()
          }
        </div>
      )
    }
    
    return (
      <a
        href={`${process.env.REACT_APP_API_URL}users/auth/github?jwt=${getToken()}`}
        className="button">
        Link Github Account
      </a>
    )
  }
}

export default Github