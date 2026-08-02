import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/ui'
import { getServicesByCategory } from '../services/api'

const serviceCardClass = 'relative flex flex-col gap-4 overflow-hidden rounded-[18px] border border-white bg-white/5 pb-[28px]'

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
            <motion.div key={s.slug} variants={fadeUp} className={serviceCardClass}>
              {Boolean(s.is_new) && (
                <span className="absolute right-5 top-5 z-10 rounded-full bg-pac-cyan px-2.5 py-1 font-heading text-[10.5px] font-bold uppercase tracking-[0.5px] text-pac-navy-950">
                  {t('Nouveau', 'New')}
                </span>
              )}
              {s.image && (
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className="h-[160px] w-full object-cover object-center sm:h-[200px]"
                />
              )}
              <div className={`flex flex-col gap-4 px-[28px] ${s.image ? '' : 'pt-[28px]'}`}>
                <h3 className="m-0 font-heading text-[17px] font-bold text-pac-ink">{s.name}</h3>
                {s.description && <p className="m-0 text-[14px] leading-[1.7] text-white/65">{s.description}</p>}
                {s.problems?.length > 0 && (
                  <ul className="m-0 flex flex-col gap-1.5 pl-0 text-[13px] leading-[1.6] text-white/55">
                    {s.problems.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-pac-cyan" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
