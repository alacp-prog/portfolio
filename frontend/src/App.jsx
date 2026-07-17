import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import Home from './pages/Home'
import Studio from './pages/Studio'
import Services from './pages/Services'
import Projets from './pages/Projets'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

function AnimatedRoutes({ lang }) {
  const location = useLocation()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? {} : { opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/studio" element={<Studio lang={lang} />} />
          <Route path="/services" element={<Services lang={lang} />} />
          <Route path="/projets" element={<Projets lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
          <Route path="*" element={<NotFound lang={lang} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('pac_lang') || 'fr'
    } catch {
      return 'fr'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const changeLang = (l) => {
    try {
      localStorage.setItem('pac_lang', l)
    } catch {
      // localStorage unavailable, ignore
    }
    setLang(l)
  }

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <a
          href="#main-content"
          className="absolute -top-full left-3 z-[1000] rounded-lg bg-pac-cyan px-5 py-3 font-heading text-sm font-bold text-pac-navy-950 transition-[top] duration-200 focus:top-3"
        >
          {lang === 'en' ? 'Skip to main content' : 'Aller au contenu principal'}
        </a>
        <SiteNav lang={lang} onLang={changeLang} />
        <AnimatedRoutes lang={lang} />
        <SiteFooter lang={lang} />
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
