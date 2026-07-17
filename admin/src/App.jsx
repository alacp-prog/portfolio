import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './components/Login'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './components/DashboardPage'
import MessagesPage from './components/MessagesPage'
import UsersPage from './components/UsersPage'

function LoginRoute() {
  const { authenticated, login, loading, error } = useAuth()

  if (authenticated) return <Navigate to="/dashboard/projects" replace />

  return <Login onLogin={login} loading={loading} error={error} />
}

function AppRoutes() {
  const { status } = useAuth()

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-brand-cyan" />
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard/:tab" element={<DashboardPage />} />
          <Route path="/messages" element={<MessagesPage />} />

          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard/projects" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
