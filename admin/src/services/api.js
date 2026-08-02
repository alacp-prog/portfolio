const BASE_URL = import.meta.env.VITE_API_URL ?? ''

let unauthorizedHandler = null

export function setUnauthorizedHandler(fn) {
  unauthorizedHandler = fn
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    // Sends/receives the HttpOnly admin_token cookie set by the API — the token itself
    // is never readable from JS, so it can no longer be attached as an Authorization header.
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
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

export function getServices() {
  return apiFetch('/services')
}

export function createService(data) {
  return apiFetch('/services', { method: 'POST', body: JSON.stringify(data) })
}

export function updateService(id, data) {
  return apiFetch(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteService(id) {
  return apiFetch(`/services/${id}`, { method: 'DELETE' })
}

export function getCategories() {
  return apiFetch('/service-categories')
}

export function createCategory(data) {
  return apiFetch('/service-categories', { method: 'POST', body: JSON.stringify(data) })
}

export function updateCategory(id, data) {
  return apiFetch(`/service-categories/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteCategory(id) {
  return apiFetch(`/service-categories/${id}`, { method: 'DELETE' })
}

export function getSolutions() {
  return apiFetch('/solutions')
}

export function createSolution(data) {
  return apiFetch('/solutions', { method: 'POST', body: JSON.stringify(data) })
}

export function updateSolution(id, data) {
  return apiFetch(`/solutions/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteSolution(id) {
  return apiFetch(`/solutions/${id}`, { method: 'DELETE' })
}

export function getServiceSolutions() {
  return apiFetch('/service-solutions')
}

export function createServiceSolution(data) {
  return apiFetch('/service-solutions', { method: 'POST', body: JSON.stringify(data) })
}

export function updateServiceSolution(id, data) {
  return apiFetch(`/service-solutions/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteServiceSolution(id) {
  return apiFetch(`/service-solutions/${id}`, { method: 'DELETE' })
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

  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    body,
    credentials: 'include',
  })
  const data = await response.json()

  if (!response.ok) {
    if (response.status === 401) unauthorizedHandler?.()
    throw new Error(data.message ?? `Upload failed: ${response.status}`)
  }

  return data.data
}
