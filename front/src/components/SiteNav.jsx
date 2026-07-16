import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import logoIcon from '../assets/pac/logo nav.png'

const NAV_LINKS = [
  { key: 'accueil', href: '/', fr: 'Accueil', en: 'Home' },
  { key: 'studio', href: '/studio', fr: 'Le Studio', en: 'Studio' },
  { key: 'services', href: '/services', fr: 'Services', en: 'Services' },
  { key: 'projets', href: '/projets', fr: 'Projets', en: 'Work' },
  { key: 'about', href: '/about', fr: 'À propos', en: 'About' },
  { key: 'contact', href: '/contact', fr: 'Contact', en: 'Contact' },
]

const MotionLink = motion.create(Link)

function NavLink({ link, active, lang, onClick }) {
  const isActive = link.key === active
  return (
    <Link
      to={link.href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className="relative px-0.5 py-1.5 font-heading text-sm font-semibold text-pac-ink"
    >
      {lang === 'en' ? link.en : link.fr}
      {isActive && <span aria-hidden="true" className="absolute inset-x-0 -bottom-[3px] h-[3px] rounded bg-pac-cyan" />}
    </Link>
  )
}

export default function SiteNav({ lang, onLang }) {
  const location = useLocation()
  const active = NAV_LINKS.find((link) => (link.href === '/' ? location.pathname === '/' : location.pathname.startsWith(link.href)))?.key ?? 'accueil'
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef(null)
  const menuRef = useRef(null)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return undefined

    const getFocusable = () =>
      Array.from(menuRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? [])

    getFocusable()[0]?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const toggleEl = menuToggleRef.current
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      toggleEl?.focus()
    }
  }, [menuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[400] border-b border-white/8 bg-pac-navy-900/85 backdrop-blur-lg">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between gap-[clamp(10px,1.5vw,24px)] px-[clamp(16px,2.5vw,32px)]">
          <Link to="/" className="flex flex-none items-center gap-2.5">
            <img src={logoIcon} alt="" className="block h-[42px]" />
            <span className="flex flex-col leading-tight">
              <span className="whitespace-nowrap font-heading text-[clamp(15px,1.5vw,19px)] font-bold tracking-[0.2px] text-pac-ink">
                Pix.Ala.Code
              </span>
              <span className="hidden whitespace-nowrap font-heading text-[11px] font-medium text-white/55 lg:block">
                {lang === 'en' ? 'Your digital success, our code.' : 'Votre succès numérique, notre code.'}
              </span>
            </span>
          </Link>

          <nav
            aria-label={lang === 'en' ? 'Primary' : 'Principale'}
            className="hidden min-[861px]:flex items-center gap-[clamp(12px,2.2vw,30px)]"
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.key} link={link} active={active} lang={lang} />
            ))}
          </nav>

          <div className="hidden min-[861px]:flex flex-none items-center gap-3.5">
            <div
              role="group"
              aria-label={lang === 'en' ? 'Choose language' : 'Choisir la langue'}
              className="flex overflow-hidden rounded-full border-[1.5px] border-white/20"
            >
              <button
                onClick={() => onLang('fr')}
                aria-pressed={lang === 'fr'}
                aria-label="Français"
                className={`px-3.5 py-1.5 font-heading text-xs font-bold ${lang === 'fr' ? 'bg-pac-cyan text-pac-navy-950' : 'bg-transparent text-white'}`}
              >
                FR
              </button>
              <button
                onClick={() => onLang('en')}
                aria-pressed={lang === 'en'}
                aria-label="English"
                className={`px-3.5 py-1.5 font-heading text-xs font-bold ${lang === 'en' ? 'bg-pac-cyan text-pac-navy-950' : 'bg-transparent text-white'}`}
              >
                EN
              </button>
            </div>
            <MotionLink
              to="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="whitespace-nowrap rounded-full bg-gradient-to-br from-pac-cyan to-pac-blue px-[22px] py-[11px] font-heading text-[13.5px] font-semibold text-white"
            >
              {lang === 'en' ? 'Start a project' : 'Démarrer un projet'}
            </MotionLink>
          </div>

          <button
            ref={menuToggleRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? (lang === 'en' ? 'Close menu' : 'Fermer le menu') : (lang === 'en' ? 'Open menu' : 'Ouvrir le menu')}
            aria-expanded={menuOpen}
            aria-controls="pac-mobile-menu"
            className="flex min-[861px]:hidden h-10 w-10 flex-none flex-col justify-center gap-[5px] border-0 bg-transparent"
          >
            <span
              aria-hidden="true"
              className="h-0.5 w-6 rounded bg-pac-ink transition-transform duration-200"
              style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}
            />
            <span
              aria-hidden="true"
              className="h-0.5 w-6 rounded bg-pac-ink transition-opacity duration-200"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              aria-hidden="true"
              className="h-0.5 w-6 rounded bg-pac-ink transition-transform duration-200"
              style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="pac-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'en' ? 'Mobile navigation' : 'Navigation mobile'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[399] flex flex-col items-center justify-center gap-9 bg-pac-navy-950"
          >
            {NAV_LINKS.map((link, i) => (
              <MotionLink
                key={link.key}
                to={link.href}
                onClick={closeMenu}
                aria-current={link.key === active ? 'page' : undefined}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="font-heading text-[28px] font-bold text-pac-ink"
              >
                {lang === 'en' ? link.en : link.fr}
              </MotionLink>
            ))}
            <MotionLink
              to="/contact"
              onClick={closeMenu}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05 }}
              className="mt-3 whitespace-nowrap rounded-full bg-gradient-to-br from-pac-cyan to-pac-blue px-[30px] py-3.5 font-heading text-[15px] font-semibold text-white"
            >
              {lang === 'en' ? 'Start a project' : 'Démarrer un projet'}
            </MotionLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
