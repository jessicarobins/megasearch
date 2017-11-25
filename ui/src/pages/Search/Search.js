import React, { Component } from 'react'

import api from '../../services/Api'
import { setToken, getToken } from '../../services/Auth'
import SearchResults from '../../components/SearchResults/SearchResults'
import ProviderMenu from '../../components/ProviderMenu/ProviderMenu'
import LoginForm from '../../components/LoginForm/LoginForm'
import SearchForm from '../../components/SearchForm/SearchForm'

class Search extends Component {

  constructor(props) {
    super(props)

    this.providers = ['github', 'slack', 'confluence', 'jira']
    this.state = {
      dirty: false,
      showLogin: false
    }
  }

  handleSearchSubmit = (searchTerm) => {
    
    if (searchTerm) {
      this.setState({
        searchTerm: searchTerm
      })
    }

    if (!!getToken()) {
      this.providers.map(this.getResults)
    } else {
      this.setState({
        showLogin: true
      })
    }
  }

  getResults = async (provider) => {
    const params = {
      query: `"${this.state.searchTerm}"`
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

  handleLogin = async (username, password) => {
    try {
      const {token, expiresIn} = await api('users/login', {
        method: 'POST',
        data: {
          username,
          password
        }
      })
      
      setToken({token, expiresIn})
      
      this.setState({
        showLogin: false
      })
      
      this.handleSearchSubmit()
    } catch(err) {
      console.log('error: ', err)
    }
  }

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
              { this.state.showLogin &&
                <div className="column">
                  <LoginForm
                    handleLogin={this.handleLogin} />
                </div>
              }
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

export default Search