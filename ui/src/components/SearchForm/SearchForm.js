import React, { Component } from 'react'

class Search extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dirty: false,
      showLogin: false
    }
  }

  handleSearchSubmit = (e) => {
    if (e) {
      e.preventDefault()
    }

    this.props.handleSearchSubmit(this.input.value)
  }

  render() {
    return (
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
    )
  }
}

export default Search