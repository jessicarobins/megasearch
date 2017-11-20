import React, { Component } from 'react'

import api from '../../services/Api'
import SearchResults from '../../components/SearchResults/SearchResults'

class Search extends Component {

  constructor(props) {
    super(props)

    this.providers = ['github', 'slack', 'confluence', 'jira']
    this.state = {
      dirty: false
    }
  }

  handleSearchSubmit = (e) => {
    e.preventDefault()
    this.providers.map(this.getResults)
  }

  getResults = async (provider) => {
    const params = {
      query: `"${this.input.value}"`
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
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1">megasearch</h1>
              <h2 className="subtitle">searching {this.providers.join(', ')}</h2>
              <form onSubmit={this.handleSearchSubmit}>
                <div className="field has-addons">
                  <div className="control">
                    <input
                      ref={(input) => this.input = input}
                      className="input is-large"
                      type="text"
                      placeholder="Search everything" />
                  </div>
                  <div className="control">
                    <button className="button is-dark is-large" type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="tile is-ancestor is-vertical">
            {
              this.providers.map((provider) => (
                <SearchResults
                  key={provider}
                  data={this.state[provider]}
                  provider={provider} />
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Search