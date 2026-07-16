const BASE_URL = import.meta.env.VITE_API_URL ?? ''

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.message ?? `Request failed: ${response.status}`)
    error.errors = data.errors
    throw error
  }

  return data
}

export function getProjects() {
  return apiFetch('/projects')
}

export function getServices() {
  return apiFetch('/services')
}

export function getSkills() {
  return apiFetch('/skills')
}

export function submitContact(data) {
  return apiFetch('/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
