import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

// index.html ships static SEO/OG tags so link-preview bots (which never run JS) get
// a working fallback. react-helmet-async only tracks tags it renders itself, so once
// it mounts these static ones must be cleared or they'd sit duplicated in the DOM —
// with the static, homepage-only values winning every query for JS-rendering crawlers
// and real users, freezing per-route titles/descriptions/canonicals at the homepage.
document
  .querySelectorAll(
    'meta[name="description"], meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"]'
  )
  .forEach((el) => el.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
