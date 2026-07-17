import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CompassIcon } from 'lucide-react'
import useT from '../hooks/useT'
import { circuitHeroBg } from '../lib/ui'

const MotionLink = motion.create(Link)

export default function NotFound({ lang }) {
  const t = useT(lang)

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-pac-navy-950 outline-none">
      <section
        aria-label={t('Page introuvable', 'Page not found')}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 py-[140px] text-center"
        style={circuitHeroBg}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex max-w-[560px] flex-col items-center gap-6"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pac-cyan/12 text-pac-cyan-light">
            <CompassIcon aria-hidden="true" size={30} strokeWidth={2} />
          </span>

          <span className="font-heading text-[clamp(60px,10vw,110px)] font-extrabold leading-none tracking-[-2px] text-pac-cyan">
            404
          </span>

          <h1 className="m-0 text-balance font-heading text-[clamp(24px,3.5vw,34px)] font-bold leading-[1.25] text-pac-ink">
            {t('Cette page n’existe pas (encore).', "This page doesn't exist (yet).")}
          </h1>

          <p className="m-0 text-[15.5px] leading-[1.7] text-white/65">
            {t(
              "Le lien est peut-être obsolète ou l'adresse mal orthographiée. Revenez à l'accueil ou explorez nos réalisations.",
              "The link may be outdated or mistyped. Head back home or browse our work instead."
            )}
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <MotionLink
              to="/"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="whitespace-nowrap rounded-full bg-gradient-to-br from-pac-cyan to-pac-blue px-8 py-4 font-heading text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(0,192,255,0.35)]"
            >
              {t("Retour à l'accueil", 'Back to home')}
            </MotionLink>
            <MotionLink
              to="/projets"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="whitespace-nowrap rounded-full border-2 border-white/25 px-7 py-4 font-heading text-[15px] font-semibold text-pac-ink"
            >
              {t('Voir nos réalisations →', 'See our work →')}
            </MotionLink>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
