import { useCallback, useEffect, useState } from 'react'
import {
  login as apiLogin,
  logout as apiLogout,
  getMe,
  getAuthToken,
  setAuthToken,
  clearAuthToken,
  setUnauthorizedHandler,
} from '../services/api'

export function useAuthState() {
  const [status, setStatus] = useState('checking') // checking | authenticated | unauthenticated
  const [user, setUser] = useState(null) // { id, email, role, firstName, lastName }
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const reset = useCallback(() => {
    clearAuthToken()
    setUser(null)
    setStatus('unauthenticated')
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(reset)

    if (!getAuthToken()) {
      setStatus('unauthenticated')
      return
    }

    getMe()
      .then((res) => {
        setUser(res.data)
        setStatus('authenticated')
      })
      .catch(() => reset())
  }, [reset])

  const login = useCallback(async (email, password, remember) => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiLogin(email, password, remember)
      setAuthToken(res.data.token, remember)
      setUser(res.data.user)
      setStatus('authenticated')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await apiLogout()
    } catch {
      // token may already be invalid/expired — clear local state regardless
    }
    reset()
  }, [reset])

  return {
    status,
    authenticated: status === 'authenticated',
    user,
    error,
    loading,
    login,
    logout,
  }
}
