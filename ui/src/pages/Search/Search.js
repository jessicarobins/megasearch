import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { isAuthenticated, loginError } from '../../reducers/UserReducer'
import * as userActions from '../../actions/UserActions'

import api from '../../services/Api'
import { getToken } from '../../services/Auth'
import SearchResults from '../../components/SearchResults/SearchResults'
import ProviderMenu from '../../components/ProviderMenu/ProviderMenu'
import LoginForm from '../../components/LoginForm/LoginForm'
import SearchForm from '../../components/SearchForm/SearchForm'
import ProviderConfig from '../../components/ProviderConfig/ProviderConfig'

class Search extends Component {

  constructor(props) {
    super(props)

    this.providers = ['github', 'slack', 'confluence', 'jira']
    this.state = {
      dirty: false,
      showLogin: false,
      loginHasError: false
    }
  }

  handleSearchSubmit = (searchTerm) => {
    
    if (searchTerm) {
      this.setState({
        searchTerm: searchTerm
      })
    }

    if (!!getToken()) {
      this.providers.map(this.getResults.bind(this, searchTerm))
    } else {
      this.setState({
        showLogin: true
      })
    }
  }

  getResults = async (searchTerm, provider) => {
    const params = {
      query: `"${searchTerm}"`
    }

    this.setState({
      dirty: true,
      [provider]: {
        loading: true
      }
    })

    const response = await api(`search/${provider}`, { params })

    this.setState({
      [provider]: {
        loading: false,
        ...response
      }
    })
  }

  async handleGithubAuth() {
    try {
      const response = await api('users/auth/github')
      console.log('response: ', response)
    } catch(err) {
      console.log('error: ', err)
    }
  }

  // handleLogin = async (username, password) => {
  //   try {
  //     const {token, expiresIn} = await api('users/login', {
  //       method: 'POST',
  //       data: {
  //         username,
  //         password
  //       }
  //     })
      
  //     setToken({token, expiresIn})
      
  //     this.setState({
  //       showLogin: false,
  //       loginHasError: false
  //     })
      
  //     this.handleSearchSubmit()
  //   } catch(err) {
  //     this.setState({
  //       loginHasError: true
  //     })
  //   }
  // }

  render() {
    return (
      <div>
        <section className={`hero is-primary is-bold ${this.state.dirty ? '' : 'is-fullheight'}`}>
          <div className="hero-body" id="top">
            <div className="container columns">
              <div className="column">
                <h1 className="title is-1">megasearch</h1>
                <h2 className="subtitle">searching {this.providers.join(', ')}</h2>
                <SearchForm
                  handleSearchSubmit={this.handleSearchSubmit} />
              </div>
              <div className="column">
              {
                !this.props.isAuthenticated ?
                <LoginForm
                  error={this.props.loginError}
                  handleLogin={this.props.userActions.login} /> :
                <ProviderConfig 
                  handleGithubAuth={this.handleGithubAuth} />
              }
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="tile is-ancestor is-vertical">
            {
              this.providers.map((provider) => (
                <SearchResults
                  searchTerm={this.state.searchTerm}
                  key={provider}
                  data={this.state[provider]}
                  provider={provider} />
              ))
            }
          </div>
        </div>
        {
          this.state.dirty && <ProviderMenu providers={this.providers} />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticated(state),
    loginError: loginError(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)