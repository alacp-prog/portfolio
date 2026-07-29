import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useT from '../hooks/useT'
import Seo from '../components/Seo'
import { breadcrumbJsonLd } from '../lib/seo'
import { cardClass, eyebrowClass, fadeUp, stagger, circuitHeroBg } from '../lib/ui'
import { getServices } from '../services/api'

export default function Services({ lang }) {
  const t = useT(lang)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    getServices()
      .then((res) => {
        if (!cancelled) setServices((res.data ?? []).filter((s) => s.visible))
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

      {/* Services grid */}
      <section className="px-8 py-[90px]">
        {loading && (
          <p className="py-10 text-center text-[15px] text-white/50">{t('Chargement des services…', 'Loading services…')}</p>
        )}
        {error && (
          <p className="py-10 text-center text-[15px] text-[#E0455A]">
            {t('Impossible de charger les services : ', 'Failed to load services: ')}
            {error}
          </p>
        )}
        {!loading && !error && services.length === 0 && (
          <p className="py-10 text-center text-[15px] text-white/50">
            {t('Aucun service pour le moment.', 'No services yet.')}
          </p>
        )}

        {!loading && !error && services.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto grid max-w-[1240px] grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
          >
            {services.map((s) => (
              <motion.div key={s.id} variants={fadeUp} whileHover={{ y: -6 }} className={`relative ${cardClass}`}>
                {Boolean(s.is_new) && (
                  <span className="absolute right-5 top-5 rounded-full bg-pac-cyan px-2.5 py-1 font-heading text-[10.5px] font-bold uppercase tracking-[0.5px] text-pac-navy-950">
                    {t('Nouveau', 'New')}
                  </span>
                )}
                <span aria-hidden="true" className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-pac-cyan/12 font-heading text-lg font-extrabold text-pac-cyan-light">
                  {s.icon || '◐'}
                </span>
                <h2 className="m-0 font-heading text-[19px] font-bold text-pac-ink">{s.title}</h2>
                <p className="m-0 text-[14.5px] leading-[1.7] text-white/65">{s.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
    </>
  )
}
