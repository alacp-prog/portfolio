import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useT from '../hooks/useT'
import { cardClass, eyebrowClass, sectionTitleClass, fadeUp, stagger, circuitHeroBg } from '../lib/ui'
import { getServices } from '../services/api'

const MotionLink = motion.create(Link)

const PLANS = [
  {
    key: 'essentiel',
    fr_name: 'Essentiel',
    en_name: 'Essentiel',
    fr_price: 'À partir de 25 000 MAD',
    en_price: 'From 25,000 MAD',
    fr_d: 'Idéal pour lancer un site vitrine ou une landing page soignée.',
    en_d: 'Ideal for launching a polished showcase site or landing page.',
    fr_features: ['Site jusqu\'à 5 pages', 'Design sur mesure', 'Responsive mobile', '1 mois de support'],
    en_features: ['Up to 5 pages', 'Custom design', 'Mobile responsive', '1 month of support'],
    featured: false,
  },
  {
    key: 'business',
    fr_name: 'Business',
    en_name: 'Business',
    fr_price: 'À partir de 60 000 MAD',
    en_price: 'From 60,000 MAD',
    fr_d: 'Pour les plateformes web ou apps avec logique métier.',
    en_d: 'For web platforms or apps with real business logic.',
    fr_features: ['Application ou plateforme complète', 'Design system dédié', 'Intégrations & API', '3 mois de support'],
    en_features: ['Full application or platform', 'Dedicated design system', 'Integrations & APIs', '3 months of support'],
    featured: true,
  },
  {
    key: 'sur-mesure',
    fr_name: 'Sur mesure',
    en_name: 'Custom',
    fr_price: 'Sur devis',
    en_price: 'Custom quote',
    fr_d: 'Pour les projets à forte complexité technique ou multi-produits.',
    en_d: 'For projects with high technical complexity or multiple products.',
    fr_features: ['Architecture sur mesure', 'Équipe dédiée', 'Accompagnement long terme', 'SLA personnalisé'],
    en_features: ['Custom architecture', 'Dedicated team', 'Long-term support', 'Custom SLA'],
    featured: false,
  },
]

export default function Services({ lang }) {
  const t = useT(lang)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    getServices()
      .then((res) => {
        if (!cancelled) setServices(res.data ?? [])
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
              <motion.div key={s.id} variants={fadeUp} whileHover={{ y: -6 }} className={cardClass}>
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

      {/* Pricing */}
      <section className="px-8 py-[90px]" style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}>
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-[52px] flex flex-col gap-3.5 text-center">
            <span className={eyebrowClass}>{t('Tarifs', 'Pricing')}</span>
            <h2 className={sectionTitleClass}>{t('Des offres claires, adaptées à chaque étape', 'Clear plans, fit to every stage')}</h2>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-3 gap-7 max-[900px]:grid-cols-1"
          >
            {PLANS.map((plan) => (
              <motion.div
                key={plan.key}
                variants={fadeUp}
                className={`flex flex-col gap-6 rounded-[20px] border p-[38px_32px] ${
                  plan.featured ? 'border-pac-cyan/50 bg-pac-cyan/8 shadow-[0_24px_48px_-20px_rgba(0,192,255,0.35)]' : 'border-white/10 bg-white/5'
                }`}
              >
                {plan.featured && (
                  <span className="w-fit rounded-full bg-pac-cyan px-3.5 py-1 font-heading text-[11px] font-bold uppercase tracking-[1px] text-pac-navy-950">
                    {t('Populaire', 'Popular')}
                  </span>
                )}
                <div className="flex flex-col gap-2">
                  <h3 className="m-0 font-heading text-[21px] font-bold text-pac-ink">{t(plan.fr_name, plan.en_name)}</h3>
                  <span className="font-heading text-[22px] font-extrabold text-pac-cyan-light">{t(plan.fr_price, plan.en_price)}</span>
                  <p className="m-0 text-[14px] leading-[1.6] text-white/65">{t(plan.fr_d, plan.en_d)}</p>
                </div>
                <ul className="m-0 flex flex-col gap-2.5 p-0">
                  {(lang === 'en' ? plan.en_features : plan.fr_features).map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[14px] text-pac-muted">
                      <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-pac-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
                <MotionLink
                  to="/contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`mt-auto rounded-full px-6 py-3.5 text-center font-heading text-[14.5px] font-bold ${
                    plan.featured ? 'bg-gradient-to-br from-pac-cyan to-pac-blue text-white' : 'border-2 border-white/25 text-pac-ink'
                  }`}
                >
                  {t('Démarrer', 'Get started')}
                </MotionLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
