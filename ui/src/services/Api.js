import axios from 'axios'

export default async function callApi(endpoint, {method = 'get', data, params} = {}) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
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