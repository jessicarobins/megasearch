import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    isAuthenticated,
    loginError,
    getProviders,
    getUsername } from '../../reducers/UserReducer'
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
      loginHasError: false
    }
  }
  
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.userActions.refreshToken()
    }
  }

  handleSearchSubmit = (searchTerm) => {
    
    if (searchTerm) {
      this.setState({
        searchTerm: searchTerm
      })
    }

    if (this.props.isAuthenticated) {
      this.providers.map(this.getResults.bind(this, searchTerm))
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

  render() {
    return (
      <div>
        <section className={`hero is-primary is-bold ${this.state.dirty ? '' : 'is-fullheight'}`}>
          <div className="hero-body" id="top">
            <div className="container columns">
              <div className="column app-name-column">
                <h1 className="title is-1">megasearch</h1>
                <h2 className="subtitle">searching {this.providers.join(', ')}</h2>
                {
                  this.props.isAuthenticated &&
                  <SearchForm
                    handleSearchSubmit={this.handleSearchSubmit} />
                }
              </div>
              <div className="column">
              {
                !this.props.isAuthenticated ?
                <LoginForm
                  error={this.props.loginError}
                  handleLogin={this.props.userActions.login} /> :
                <ProviderConfig
                  logout={this.props.userActions.logout}
                  username={this.props.username}
                  allProviders={this.providers}
                  userProviders={this.props.userProviders}
                  updateGithubOrg={this.props.userActions.updateGithubOrgRequest} />
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
    loginError: loginError(state),
    userProviders: getProviders(state),
    username: getUsername(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)