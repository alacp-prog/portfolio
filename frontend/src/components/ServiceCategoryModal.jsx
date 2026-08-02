import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cardClass, fadeUp, stagger } from '../lib/ui'
import { getServicesByCategory } from '../services/api'

export default function ServiceCategoryModal({ category, onClose, t }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const panelRef = useRef(null)

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

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-pac-navy-950/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        role="dialog"
        aria-modal="true"
        aria-label={category.name}
        className="fixed inset-x-4 top-1/2 z-[101] mx-auto max-h-[85vh] max-w-[900px] -translate-y-1/2 overflow-y-auto rounded-[20px] border border-white/10 bg-pac-navy-950 p-8 shadow-2xl sm:inset-x-8 md:p-10"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="m-0 font-heading text-[24px] font-bold text-pac-ink">{category.name}</h2>
            {category.description && (
              <p className="m-0 max-w-[560px] text-[14.5px] leading-[1.7] text-white/60">{category.description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('Fermer', 'Close')}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

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
            {t('Aucun service dans cette catégorie pour le moment.', 'No services in this category yet.')}
          </p>
        )}

        {!loading && !error && services.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1"
          >
            {services.map((s) => (
              <motion.div key={s.slug} variants={fadeUp} className={`relative ${cardClass}`}>
                {Boolean(s.is_new) && (
                  <span className="absolute right-5 top-5 rounded-full bg-pac-cyan px-2.5 py-1 font-heading text-[10.5px] font-bold uppercase tracking-[0.5px] text-pac-navy-950">
                    {t('Nouveau', 'New')}
                  </span>
                )}
                {s.image && (
                  <img src={s.image} alt="" className="h-[52px] w-[52px] rounded-2xl object-cover" />
                )}
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
