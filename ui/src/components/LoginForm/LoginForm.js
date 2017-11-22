import React, { Component } from 'react'

class LoginForm extends Component {
  
  handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log('loggin in!')
    if (this.username.value && this.password.value) {
      this.props.handleLogin(this.username.value, this.password.value)
    }
  }

  render() {
    return (
      <div className="box">
        <form onSubmit={this.handleLoginSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                ref={(input) => this.username = input}
                className="input"
                type="email"
                placeholder="Email address" />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                ref={(input) => this.password = input}
                className="input"
                placeholder="Password"
                type="password" />
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
