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
  
  renderOrg = () => {
    if (this.props.info.organization) {
      return <span>using organization <strong>{this.props.info.organization}</strong></span>
    }
    
    return null
  }

  render() {
    if (this.props.info) {
      return (
        <div className="provider-config-item">
          <i className="fa fa-github provider-config-icon" aria-hidden="true"></i>
          <div className="width-100">
            <div className="provider-link">
              Linked to Github as <strong>{this.props.info.username}</strong> {this.renderOrg()}
            </div>
            {
              !this.props.info.organization && this.renderOrgForm()
            }
          </div>
        </div>
      )
    }
    
    return (
      <div className="provider-link">
        <a
          href={`${process.env.REACT_APP_API_URL}users/auth/github?jwt=${getToken()}`}
          className="button is-warning">
          <i className="fa fa-github provider-config-icon" aria-hidden="true"></i>
          Link Github Account
        </a>
      </div>
    )
  }
}

export default Github