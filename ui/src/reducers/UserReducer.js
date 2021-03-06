import { combineReducers } from 'redux'

import * as actions from '../actions/ActionTypes'
import { getToken } from '../services/Auth'

const authenticated = (
  state = !!getToken(),
  action
) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return true
    case actions.LOGIN_ERROR:
      return false
    case actions.LOGOUT_SUCCESS:
      return false
    default:
      return state
  }
}

const error = (
  state = '',
  action
) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return false
    case actions.LOGIN_ERROR:
      return action.error
    case actions.LOGOUT_SUCCESS:
      return false
    default:
      return state
  }
}

const providers = (
  state = [],
  action
) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return action.providers
    case actions.UPDATE_USER:
      return action.providers
    case actions.LOGIN_ERROR:
      return []
    case actions.LOGOUT_SUCCESS:
      return []
    default:
      return state
  }
}

const username = (
  state = '',
  action
) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return action.username
    case actions.UPDATE_USER:
      return action.username
    case actions.LOGIN_ERROR:
      return ''
    case actions.LOGOUT_SUCCESS:
      return ''
    default:
      return state
  }
}


const UserReducer = combineReducers({
  authenticated,
  providers,
  username,
  error
})

export const isAuthenticated = state => state.user.authenticated
export const loginError = state => state.user.error
export const getProviders = state => state.user.providers
export const getUsername = state => state.user.username

export default UserReducer