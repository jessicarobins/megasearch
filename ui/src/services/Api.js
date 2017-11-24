import axios from 'axios'

import { getToken } from './Auth'

export default async function callApi(endpoint, {method = 'get', data, params} = {}) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const token = getToken()

  if (token) {
    headers['Authorization'] =  `Bearer ${token}`
  }

  try {
    const response = await axios({
      baseURL: process.env.REACT_APP_API_URL,
      headers: headers,
      method: method,
      url: endpoint,
      data: data,
      params: params
    })

    return response.data
  } catch(err) {
    if (err.response) {
      return Promise.reject(err.response.data)
    }

    return Promise.reject(err.message)
  }
}