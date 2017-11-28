export function setToken({token, expiresIn}) {
  const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime())

  localStorage.setItem('access_token', token)
  localStorage.setItem('expires_at', expiresAt)
}

export function getToken() {
  const token = localStorage.getItem('access_token')
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  if (!!token && (new Date().getTime() < expiresAt)) {
    return token
  }
}

export function removeToken() {
  localStorage.removeItem('expires_at')
  localStorage.removeItem('access_token')
}
