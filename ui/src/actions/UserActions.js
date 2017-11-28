import api from '../services/Api'
import { setToken, removeToken } from '../services/Auth'
import * as actions from './ActionTypes'

export function login(username, password) {
  return (dispatch) => {
    return api('users/login', {
      method: 'POST',
      data: {
        username,
        password
      }
    })
    .then(({token, expiresIn, user}) => {
      dispatch(loginSuccess(user, token, expiresIn))
    })
    .catch(err => {
      dispatch(loginFailure('Username or password is incorrect.'))
    })
  }
}

export function refreshToken() {
  return (dispatch) => {
    return api('users/refresh')
    .then(({token, expiresIn, user}) => {
      dispatch(loginSuccess(user, token, expiresIn))
    })
    .catch(err => {
      dispatch(loginFailure('Authorization failed.'))
    })
  }
}

export function updateGithubOrgRequest(org) {
  return (dispatch) => {
    return api('users/github/organization', {
      method: 'PUT',
      data: {
        organization: org
      }
    })
    .then(({user}) => {
      dispatch(updateUser(user))
    })
    .catch(console.log)
  }
}

export function addAtlassian({username, password, organization}) {
  return (dispatch) => {
    return api('users/auth/atlassian', {
      method: 'PUT',
      data: {
        username,
        password,
        organization
      }
    })
    .then(({user}) => {
      dispatch(updateUser(user))
    })
    .catch(console.log)
  }
}

export function loginSuccess({providers, username}, token, expiresIn) {
  setToken({token, expiresIn})

  return {
    type: actions.LOGIN_SUCCESS,
    providers,
    username
  }
}

export function updateUser({providers, username}) {
  return {
    type: actions.UPDATE_USER,
    providers,
    username
  }
}

export function loginFailure(error) {
  return {
    type: actions.LOGIN_ERROR,
    error
  }
}

export function logout() {
  removeToken()

  return {
    type: actions.LOGOUT_SUCCESS
  }
}
