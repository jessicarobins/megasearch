import React, { Component } from 'react'

class Atlassian extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      showForm: false,
      emailInvalid: false,
      passwordInvalid: false,
      orgInvalid: false
    }
  }
  
  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm,
      emailInvalid: false,
      passwordInvalid: false,
      orgInvalid: false
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    
    if (this.username.value &&
      this.password.value &&
      this.org.value) {
      this.props.add({
        username: this.username.value,
        password: this.password.value,
        organization: this.org.value
      })
    }
    
    const newState = {}
    if (!this.username.value || !this.username.value.length) {
      newState.emailInvalid = true
    } else {
      newState.emailInvalid = false
    }
    
    if (!this.password.value || !this.password.value.length) {
      newState.passwordInvalid = true
    } else {
      newState.passwordInvalid = false
    }
    
    if (!this.org.value || !this.org.value.length) {
      newState.orgInvalid = true
    } else {
      newState.orgInvalid = false
    }
    
    this.setState(newState)
  }

  renderForm = () => {
    return (
      <div className="message" style={{marginTop: 20}}>
        <div className="message-header">
          Enter your Atlassian account information
          <button
            onClick={this.toggleForm}
            className="delete" aria-label="delete"></button>
        </div>
        <form
          className="message-body"
          onSubmit={this.handleFormSubmit}>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Organization</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control is-expanded">
                  <input
                    ref={(input) => this.org = input}
                    className={`input ${this.state.orgInvalid ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="Organization" />
                    { this.state.orgInvalid &&
                      <p className="help is-danger">Organization is required</p>
                    }
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Username</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control is-expanded">
                  <input
                    ref={(input) => this.username = input}
                    className={`input ${this.state.emailInvalid ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="Username" />
                    { this.state.emailInvalid &&
                      <p className="help is-danger">Username is required</p>
                    }
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Password</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control is-expanded">
                  <input
                    ref={(input) => this.password = input}
                    className={`input ${this.state.passwordInvalid ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="Password" />
                    { this.state.passwordInvalid &&
                      <p className="help is-danger">Password is required</p>
                    }
                </div>
              </div>
            </div>
          </div>
          <button
            className="button is-warning"
            type="submit">
            <i className="devicon-confluence-plain provider-config-icon" aria-hidden="true"></i>
            Link Atlassian
          </button>
        </form>
      </div>
    )
  }

  render() {
    if (this.props.info) {
      return (
        <p className="provider-config-item">
          <i className="devicon-confluence-plain provider-config-icon" aria-hidden="true"></i>
          <span>
            Linked to Atlassian as <strong>{this.props.info.username}</strong>
          </span>
        </p>
      )
    }
    
    return (
      <div className="provider-link">
        {
          this.state.showForm ?
            this.renderForm() :
            <button
              className="button is-warning"
              onClick={this.toggleForm}>
              <i className="devicon-confluence-plain provider-config-icon" aria-hidden="true"></i>
              Link Atlassian
            </button>
        }
      </div>
    )
  }
}

export default Atlassian