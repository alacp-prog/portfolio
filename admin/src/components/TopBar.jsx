import { motion, AnimatePresence } from 'framer-motion'
import { List, CaretRight, Sun, Moon, SignOut } from '@phosphor-icons/react'
import { tapScale } from '../lib/motion'

export default function TopBar({
  pageTitle,
  onOpenMobileNav,
  theme,
  onToggleTheme,
  adminEmail,
  onLogout,
}) {
  const initials = adminEmail ? adminEmail.slice(0, 2).toUpperCase() : 'AB'

  return (
    <header className="flex h-16 flex-none items-center justify-between border-b border-border bg-surface px-5 md:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          aria-label="Ouvrir la navigation"
          className="-ml-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 hover:bg-surface-muted md:hidden cursor-pointer"
        >
          <List size={19} />
        </button>
        <div className="flex items-center gap-1.5 text-[12.5px] text-ink-400">
          <span className="hidden sm:inline">Admin</span>
          <CaretRight size={11} className="hidden sm:inline" />
          <span className="font-semibold text-ink-900">{pageTitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
          title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
          className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg text-ink-600 hover:bg-surface-muted cursor-pointer"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>

        <div className="hidden h-[26px] w-px bg-border sm:block" />

        <button
          type="button"
          onClick={onLogout}
          aria-label="Se déconnecter"
          title={adminEmail ? `Déconnecter ${adminEmail}` : 'Se déconnecter'}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 hover:bg-danger-bg hover:text-danger cursor-pointer"
        >
          <SignOut size={18} />
        </button>

        <motion.span
          whileTap={tapScale}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan to-brand-blue font-heading text-[13px] font-bold text-white"
        >
          {initials}
        </motion.span>
      </div>
    </header>
  )
}
