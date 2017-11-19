import React, { Component } from 'react'

import api from '../../services/Api'

class Search extends Component {

  constructor(props) {
    super(props)

    this.providers = ['slack', 'jira', 'confluence', 'github']
  }

  handleSearchSubmit = (e) => {
    e.preventDefault()
    this.providers.map(this.getResults)
  }

  getResults = async (provider) => {
    const params = {
      query: this.input.value
    }

    const response = await api(`search/${provider}`, { params })

    this.setState({
      [provider]: response
    })
  }

  render() {
    return (
      <div className="container">
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
              <button className="button is-info is-large" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Search