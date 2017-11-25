import React, { Component } from 'react'
import './LoginForm.css'

class LoginForm extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      emailInvalid: false,
      passwordInvalid: false
    }
  }
  
  handleLoginSubmit = (e) => {
    e.preventDefault()
    if (this.username.value && this.password.value) {
      this.props.handleLogin(this.username.value, this.password.value)
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
    
    this.setState(newState)
  }

  render() {
    return (
      <div className="box login-form">
        <h3 className="title is-4">Log in or sign up to view search results</h3>
        { this.props.hasError &&
          <p className="help is-danger">Email or password is invalid</p>
        }
        <form onSubmit={this.handleLoginSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                ref={(input) => this.username = input}
                className={`input ${this.state.emailInvaild ? 'is-danger' : ''}`}
                type="email"
                placeholder="Email address" />
              { this.state.emailInvalid &&
                <p className="help is-danger">Email is invalid</p>
              }
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                ref={(input) => this.password = input}
                className={`input ${this.state.emailInvaild ? 'is-danger' : ''}`}
                placeholder="Password"
                type="password" />
              { this.state.passwordInvalid &&
                <p className="help is-danger">Password is invalid</p>
              }
            </div>
          </div>
          <button
            className="button is-warning"
            type="submit">Sign Up/Log In</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
