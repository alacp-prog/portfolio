import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { useTheme } from '../lib/theme'
import { useAuth } from '../context/AuthContext'

const PAGE_TITLES = {
  '/dashboard/projects': 'Projets',
  '/dashboard/skills': 'Compétences',
  '/messages': 'Messages',
  '/users': 'Utilisateurs',
}

export default function Layout() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen md:grid md:grid-cols-[252px_1fr]">
      <Sidebar role={user?.role} mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />

      <div className="flex min-w-0 flex-col">
        <TopBar
          pageTitle={PAGE_TITLES[location.pathname] ?? 'Admin'}
          onOpenMobileNav={() => setMobileNavOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          adminEmail={user?.email}
          onLogout={logout}
        />

        <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
