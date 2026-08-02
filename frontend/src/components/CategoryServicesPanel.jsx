import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { fadeUp, stagger } from '../lib/ui'
import { getServicesByCategory, getSolutionsByService } from '../services/api'
import pacLogo from '../assets/pac/logo-white.png'

const MotionLink = motion.create(Link)

const cardShellClass = 'relative overflow-hidden rounded-[18px] border border-white bg-white/5'

function ServiceFrontFace({ service, t }) {
  return (
    <div className="flex flex-col gap-4 pb-[28px]">
      {Boolean(service.is_new) && (
        <span className="absolute right-5 top-5 z-10 rounded-full bg-pac-cyan px-2.5 py-1 font-heading text-[10.5px] font-bold uppercase tracking-[0.5px] text-pac-navy-950">
          {t('Nouveau', 'New')}
        </span>
      )}
      {service.image && (
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="h-[160px] w-full object-cover object-center sm:h-[200px]"
        />
      )}
      <div className={`flex flex-col gap-4 px-[28px] ${service.image ? '' : 'pt-[28px]'}`}>
        <h3 className="m-0 font-heading text-[17px] font-bold text-pac-ink">{service.name}</h3>
        {service.description && <p className="m-0 text-[14px] leading-[1.7] text-white/65">{service.description}</p>}
        {service.problems?.length > 0 && (
          <ul className="m-0 flex flex-col gap-1.5 pl-0 text-[13px] leading-[1.6] text-white/55">
            {service.problems.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-pac-cyan" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function ServiceSolutionsFace({ solutions, loading, error, t }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 p-[28px] text-center">
      <img src={pacLogo} alt="Pix.Ala.Code" className="h-9 w-auto" />
      <h3 className="m-0 font-heading text-[14.5px] font-bold uppercase tracking-[0.6px] text-pac-cyan-light">
        {t('Solution Pix.Ala.Code', 'Pix.Ala.Code Solution')}
      </h3>

      {loading && <p className="m-0 text-[13px] text-white/50">{t('Chargement…', 'Loading…')}</p>}
      {error && <p className="m-0 text-[13px] text-[#E0455A]">{error}</p>}
      {!loading && !error && solutions?.length === 0 && (
        <p className="m-0 text-[13px] text-white/50">
          {t('Aucune solution associée pour le moment.', 'No solution linked yet.')}
        </p>
      )}
      {!loading && !error && solutions?.length > 0 && (
        <ul className="m-0 flex w-full flex-col gap-2 pl-0 text-left">
          {solutions.map((sol) => (
            <li
              key={sol.solution_slug}
              className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2 text-[13.5px] text-white/80"
            >
              <span className="flex min-w-0 items-center gap-1.5 truncate">
                {Boolean(sol.is_recommended) && <Star size={13} className="flex-none fill-pac-cyan text-pac-cyan" />}
                <span className="truncate">{sol.solution_name}</span>
              </span>
              <span className="flex-none text-[12px] text-white/50">
                {sol.price_type === 'fixed' ? `${Number(sol.price).toFixed(0)} DT` : t('Sur devis', 'Quote')}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && (
        <MotionLink
          to="/contact"
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-1 whitespace-nowrap rounded-full bg-gradient-to-br from-pac-cyan to-pac-blue px-6 py-2.5 font-heading text-[13px] font-bold text-white shadow-[0_8px_24px_rgba(0,192,255,0.35)]"
        >
          {t('Nous contacter', 'Contact us')}
        </MotionLink>
      )}
    </div>
  )
}

function FlippableServiceCard({ service, t }) {
  const [rotation, setRotation] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [solutions, setSolutions] = useState(null)
  const [loadingSolutions, setLoadingSolutions] = useState(false)
  const [solutionsError, setSolutionsError] = useState(null)

  function handleClick() {
    if (!flipped && solutions === null) {
      setLoadingSolutions(true)
      setSolutionsError(null)
      getSolutionsByService(service.slug)
        .then((res) => setSolutions(res.data ?? []))
        .catch((err) => setSolutionsError(err.message))
        .finally(() => setLoadingSolutions(false))
    }
    setRotation((r) => r + 360)
    setTimeout(() => setFlipped((f) => !f), 350)
  }

  return (
    <motion.div
      variants={fadeUp}
      className={cardShellClass}
      style={{ perspective: 1000 }}
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={t('Voir les solutions associées', 'View linked solutions')}
        onClick={handleClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="cursor-pointer"
      >
        {flipped ? (
          <ServiceSolutionsFace solutions={solutions} loading={loadingSolutions} error={solutionsError} t={t} />
        ) : (
          <ServiceFrontFace service={service} t={t} />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function CategoryServicesPanel({ category, t }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getServicesByCategory(category.slug)
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
  }, [category.slug])

  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      {loading && (
        <p className="py-6 text-center text-[14px] text-white/50">{t('Chargement des services…', 'Loading services…')}</p>
      )}
      {error && (
        <p className="py-6 text-center text-[14px] text-[#E0455A]">
          {t('Impossible de charger les services : ', 'Failed to load services: ')}
          {error}
        </p>
      )}
      {!loading && !error && services.length === 0 && (
        <p className="py-6 text-center text-[14px] text-white/50">
          {t('Aucun service dans cette catégorie pour le moment.', 'No services in this category yet.')}
        </p>
      )}

      {!loading && !error && services.length > 0 && (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
        >
          {services.map((s) => (
            <FlippableServiceCard key={s.slug} service={s} t={t} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
