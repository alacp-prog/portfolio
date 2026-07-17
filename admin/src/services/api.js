const BASE_URL = import.meta.env.VITE_API_URL ?? ''
const TOKEN_KEY = 'admin_token'

let unauthorizedHandler = null

export function setUnauthorizedHandler(fn) {
  unauthorizedHandler = fn
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
}

export function setAuthToken(token, remember) {
  clearAuthToken()
  ;(remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token)
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}

export async function apiFetch(path, options = {}) {
  const token = getAuthToken()

  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    if (response.status === 401) unauthorizedHandler?.()
    const error = new Error(data.message ?? `Request failed: ${response.status}`)
    error.errors = data.errors
    error.status = response.status
    throw error
  }

  return data
}

export function login(email, password, remember) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, remember }),
  })
}

export function logout() {
  return apiFetch('/auth/logout', { method: 'POST' })
}

export function getMe() {
  return apiFetch('/auth/me')
}

export function getProjects() {
  return apiFetch('/projects')
}

export function createProject(data) {
  return apiFetch('/projects', { method: 'POST', body: JSON.stringify(data) })
}

export function updateProject(id, data) {
  return apiFetch(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteProject(id) {
  return apiFetch(`/projects/${id}`, { method: 'DELETE' })
}

export function getSkills() {
  return apiFetch('/skills')
}

export function createSkill(data) {
  return apiFetch('/skills', { method: 'POST', body: JSON.stringify(data) })
}

export function updateSkill(id, data) {
  return apiFetch(`/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteSkill(id) {
  return apiFetch(`/skills/${id}`, { method: 'DELETE' })
}

export function getUsers() {
  return apiFetch('/users')
}

export function createUser(data) {
  return apiFetch('/users', { method: 'POST', body: JSON.stringify(data) })
}

export function updateUser(id, data) {
  return apiFetch(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteUser(id) {
  return apiFetch(`/users/${id}`, { method: 'DELETE' })
}

export function getContacts() {
  return apiFetch('/contacts')
}

export function deleteContact(id) {
  return apiFetch(`/contacts/${id}`, { method: 'DELETE' })
}

export async function uploadImage(file, folder = 'portfolio') {
  const body = new FormData()
  body.append('file', file)
  body.append('folder', folder)

  const token = getAuthToken()
  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    body,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
  const data = await response.json()

  if (!response.ok) {
    if (response.status === 401) unauthorizedHandler?.()
    throw new Error(data.message ?? `Upload failed: ${response.status}`)
  }

  return data.data
}
