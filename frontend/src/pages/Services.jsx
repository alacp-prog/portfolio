import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import useT from '../hooks/useT'
import Seo from '../components/Seo'
import { breadcrumbJsonLd } from '../lib/seo'
import { eyebrowClass, fadeUp, stagger, circuitHeroBg } from '../lib/ui'
import { getCategories } from '../services/api'

export default function Services({ lang }) {
  const t = useT(lang)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeSlug, setActiveSlug] = useState(null)

  useEffect(() => {
    let cancelled = false

    getCategories()
      .then((res) => {
        if (!cancelled) setCategories(res.data ?? [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const categoryCards = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name)),
    [categories]
  )

  return (
    <>
      <Seo
        lang={lang}
        title={t('Services & tarifs', 'Services & pricing')}
        description={t(
          'Design UI/UX, développement web et mobile, branding : découvrez nos services et nos formules tarifaires, du site vitrine à la plateforme sur mesure.',
          'UI/UX design, web & mobile development, branding: explore our services and pricing plans, from showcase sites to custom platforms.'
        )}
        path="/services"
        jsonLd={breadcrumbJsonLd([
          { name: t('Accueil', 'Home'), path: '/' },
          { name: t('Services', 'Services'), path: '/services' },
        ])}
      />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-pac-navy-950 outline-none">
      <section aria-label={t('Services', 'Services')} className="relative overflow-hidden px-8 pb-[80px] pt-[170px] text-center" style={circuitHeroBg}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto flex max-w-[720px] flex-col items-center gap-6"
        >
          <span className={eyebrowClass}>{t('Nos services', 'Our services')}</span>
          <h1 className="m-0 text-balance font-heading text-[clamp(32px,5vw,54px)] font-extrabold leading-[1.15] tracking-[-1px] text-pac-ink">
            {t('Ce que nous savons livrer', 'What we deliver')}
          </h1>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.75] text-white/65">
            {t(
              'Du design à la mise en production, chaque service peut être combiné selon les besoins de votre projet.',
              'From design to production release, every service can be combined to fit your project needs.'
            )}
          </p>
        </motion.div>
      </section>

      {/* Categories */}
      <section aria-label={t('Catégories', 'Categories')} className="px-8 py-[90px]">
        {loading && (
          <p className="py-10 text-center text-[15px] text-white/50">{t('Chargement des catégories…', 'Loading categories…')}</p>
        )}
        {error && (
          <p className="py-10 text-center text-[15px] text-[#E0455A]">
            {t('Impossible de charger les catégories : ', 'Failed to load categories: ')}
            {error}
          </p>
        )}
        {!loading && !error && categoryCards.length === 0 && (
          <p className="py-10 text-center text-[15px] text-white/50">
            {t('Aucune catégorie pour le moment.', 'No categories yet.')}
          </p>
        )}

        {!loading && !error && categoryCards.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto grid max-w-[1240px] grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
          >
            {categoryCards.map((c) => {
              const active = activeSlug === c.slug
              return (
                <motion.button
                  key={c.id}
                  type="button"
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveSlug(active ? null : c.slug)}
                  aria-pressed={active}
                  className={`relative flex flex-col items-start gap-2 rounded-[16px] border p-[22px] text-left transition-colors ${
                    active
                      ? 'border-pac-cyan bg-pac-cyan/10'
                      : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.07]'
                  }`}
                >
                  {Boolean(c.is_new) && (
                    <span className="absolute right-4 top-0 -translate-y-1/2 rounded-full bg-pac-cyan px-3 py-1 font-heading text-[11.5px] font-bold uppercase tracking-[0.5px] text-pac-navy-950 shadow-md">
                      {t('Nouveau', 'New')}
                    </span>
                  )}
                  <h3 className={`m-0 font-heading text-[16.5px] font-bold ${active ? 'text-pac-cyan-light' : 'text-pac-ink'}`}>
                    {c.name}
                  </h3>
                  {c.description && (
                    <p className="m-0 line-clamp-2 text-[13.5px] leading-[1.6] text-white/60">{c.description}</p>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </section>
    </main>
    </>
  )
}
