import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'
import Search from './pages/Search/Search'

const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger')

  middleware.push(logger)
}

const store = createStore(reducers, applyMiddleware(...middleware))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Search />
      </Provider>
    )
  }
}

export default App
