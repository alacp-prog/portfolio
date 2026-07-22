import { useCallback, useEffect, useState } from 'react'
import {
  login as apiLogin,
  logout as apiLogout,
  getMe,
  setUnauthorizedHandler,
} from '../services/api'

export function useAuthState() {
  const [status, setStatus] = useState('checking') // checking | authenticated | unauthenticated
  const [user, setUser] = useState(null) // { id, email, role, firstName, lastName }
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const reset = useCallback(() => {
    setUser(null)
    setStatus('unauthenticated')
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(reset)

    // The auth token now lives in an HttpOnly cookie sent automatically with every
    // request, so session state is only known by asking the server.
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
