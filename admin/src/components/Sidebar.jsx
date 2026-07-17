import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { SquaresFour, Sparkle, Envelope, Users, ArrowLeft, SignOut, X } from '@phosphor-icons/react'
import { overlayVariants } from '../lib/motion'
import logo from '../assets/logo-white.png'

function getNavItems(role) {
  const items = [
    { to: '/dashboard/projects', label: 'Projets', icon: SquaresFour },
    { to: '/dashboard/skills', label: 'Compétences', icon: Sparkle },
    { to: '/messages', label: 'Messages', icon: Envelope },
  ]
  if (role === 'admin') {
    items.push({ to: '/users', label: 'Utilisateurs', icon: Users })
  }
  return items
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-2.5 pb-5 pt-1.5">
      <img src={logo} alt="Pix.Ala.Code" className="h-[30px]" />
      <div className="flex flex-col leading-[1.15]">
        <span className="font-heading font-bold text-[14.5px] text-white">Pix.Ala.Code</span>
        <span className="text-[11px] tracking-wide text-white/45">ADMIN</span>
      </div>
    </div>
  )
}

function NavList({ role, onNavigate, layoutScope }) {
  return (
    <nav className="flex flex-col gap-1" role="tablist" aria-label="Sections">
      {getNavItems(role).map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `relative flex items-center gap-2.5 rounded-lg py-2.5 pl-3 pr-3 text-left font-heading text-[13.5px] font-semibold transition-colors duration-150 cursor-pointer ${
              isActive ? 'text-white' : 'text-white/65 hover:text-white/90 hover:bg-white/[0.04]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId={`sidebar-active-${layoutScope}`}
                  className="absolute inset-0 rounded-lg bg-navy-800 border-l-[3px] border-brand-cyan"
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              <Icon size={17} weight={isActive ? 'fill' : 'regular'} className="relative z-10 flex-none" />
              <span className="relative z-10">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

function BackLink({ onLogout }) {
  return (
    <div className="mt-auto flex flex-col gap-0.5 border-t border-white/[0.08] pt-4">
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[13px] text-white/55 hover:bg-danger-bg hover:text-danger transition-colors cursor-pointer"
      >
        <SignOut size={15} />
        Se déconnecter
      </button>
      <a
        href="https://portfolio-frontend-f2h.pages.dev/"
        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] text-white/55 hover:text-white/85 hover:bg-white/[0.04] transition-colors"
      >
        <ArrowLeft size={15} />
        Retour au site
      </a>
    </div>
  )
}

export default function Sidebar({ role, mobileOpen, onCloseMobile, onLogout }) {
  useEffect(() => {
    if (!mobileOpen) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') onCloseMobile()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen, onCloseMobile])

  return (
    <>
      <aside className="hidden md:flex w-[252px] flex-none flex-col gap-1 bg-navy-900 px-4 py-6">
        <Brand />
        <span className="px-2.5 pb-2 pt-3.5 font-heading text-[11px] font-bold uppercase tracking-[1.2px] text-white/35">
          Contenu
        </span>
        <NavList role={role} layoutScope="desktop" />
        <BackLink onLogout={onLogout} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed inset-0 z-40 bg-navy-950/50 md:hidden"
              onClick={onCloseMobile}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0, transition: { type: 'spring', stiffness: 340, damping: 34 } }}
              exit={{ x: '-100%', transition: { duration: 0.22, ease: 'easeIn' } }}
              className="fixed inset-y-0 left-0 z-50 flex w-[80%] max-w-[280px] flex-col gap-1 bg-navy-900 px-4 py-6 md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
            >
              <div className="flex items-start justify-between">
                <Brand />
                <button
                  type="button"
                  onClick={onCloseMobile}
                  aria-label="Fermer le menu"
                  className="mt-1.5 rounded-lg p-1.5 text-white/60 hover:bg-white/[0.06] hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <span className="px-2.5 pb-2 pt-1 font-heading text-[11px] font-bold uppercase tracking-[1.2px] text-white/35">
                Contenu
              </span>
              <NavList role={role} onNavigate={onCloseMobile} layoutScope="mobile" />
              <BackLink onLogout={onLogout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
