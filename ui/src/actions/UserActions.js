import api from '../services/Api'
import { setToken } from '../services/Auth'
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
      setToken({token, expiresIn})
      dispatch(loginSuccess(user))
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
      setToken({token, expiresIn})
      dispatch(loginSuccess(user))
    })
    .catch(err => {
      dispatch(loginFailure('Authorization failed.'))
    })
  }
}

export function loginSuccess({providers}) {
  return {
    type: actions.LOGIN_SUCCESS,
    providers
  }
}

export function loginFailure(error) {
  return {
    type: actions.LOGIN_ERROR,
    error
  }
}
