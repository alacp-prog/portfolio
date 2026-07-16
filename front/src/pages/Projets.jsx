import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useT from '../hooks/useT'
import { eyebrowClass, fadeUp, stagger, circuitHeroBg, placeholderClass } from '../lib/ui'
import { getProjects } from '../services/api'

const MotionLink = motion.create(Link)

export default function Projets({ lang }) {
  const t = useT(lang)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let cancelled = false

    getProjects()
      .then((res) => {
        if (!cancelled) setProjects(res.data ?? [])
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

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
    [projects]
  )

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  )

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-pac-navy-950 outline-none">
      <section aria-label={t('Réalisations', 'Work')} className="relative overflow-hidden px-8 pb-[70px] pt-[170px] text-center" style={circuitHeroBg}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto flex max-w-[720px] flex-col items-center gap-6"
        >
          <span className={eyebrowClass}>{t('Réalisations', 'Selected work')}</span>
          <h1 className="m-0 text-balance font-heading text-[clamp(32px,5vw,54px)] font-extrabold leading-[1.15] tracking-[-1px] text-pac-ink">
            {t('Des projets, des résultats', 'Projects, results')}
          </h1>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.75] text-white/65">
            {t(
              'Un aperçu de produits digitaux livrés récemment, avec les résultats obtenus pour nos clients.',
              "A look at digital products shipped recently, with the results they've delivered for our clients."
            )}
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      {categories.length > 0 && (
        <section className="px-8 pt-[50px]">
          <div
            role="group"
            aria-label={t('Filtrer par catégorie', 'Filter by category')}
            className="mx-auto flex max-w-[1240px] flex-wrap justify-center gap-3"
          >
            {['all', ...categories].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={filter === key}
                className={`rounded-full border-[1.5px] px-5 py-2.5 font-heading text-[13.5px] font-semibold ${
                  filter === key ? 'border-pac-cyan bg-pac-cyan text-pac-navy-950' : 'border-white/20 bg-transparent text-white'
                }`}
              >
                {key === 'all' ? t('Tous', 'All') : key}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Projects grid */}
      <section className="px-8 py-[70px]">
        {loading && (
          <p className="py-10 text-center text-[15px] text-white/50">{t('Chargement des projets…', 'Loading projects…')}</p>
        )}
        {error && (
          <p className="py-10 text-center text-[15px] text-[#E0455A]">
            {t('Impossible de charger les projets : ', 'Failed to load projects: ')}
            {error}
          </p>
        )}
        {!loading && !error && filtered.length === 0 && (
          <p className="py-10 text-center text-[15px] text-white/50">
            {t('Aucun projet pour le moment — revenez bientôt.', 'No projects yet — check back soon.')}
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <motion.div
            layout
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mx-auto grid max-w-[1240px] grid-cols-3 gap-7 max-[900px]:grid-cols-1"
          >
            {filtered.map((project) => (
              <motion.div key={project.id} layout variants={fadeUp} whileHover={{ y: -6 }} className="flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/5">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="h-[220px] w-full object-cover" />
                ) : (
                  <div className={`h-[220px] ${placeholderClass}`}>{t('Capture — ' + project.title, 'Screenshot — ' + project.title)}</div>
                )}
                <div className="flex flex-col gap-2 p-[24px_26px]">
                  <div className="flex items-center justify-between gap-3">
                    {project.category && (
                      <span className="font-heading text-xs font-semibold uppercase tracking-[1.5px] text-pac-cyan-light">
                        {project.category}
                      </span>
                    )}
                    {project.year && <span className="text-xs font-semibold text-white/40">{project.year}</span>}
                  </div>
                  <h2 className="m-0 font-heading text-[21px] font-bold text-pac-ink">{project.title}</h2>
                  <p className="m-0 text-sm text-white/65">{project.description}</p>
                  {project.stack?.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="rounded-full bg-white/8 px-3 py-1 text-[12px] font-medium text-white/70">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {(project.demo_url || project.github_url) && (
                    <div className="mt-2 flex flex-wrap gap-3">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-heading text-[13px] font-semibold text-pac-cyan-light"
                        >
                          {t('Voir le site →', 'Live demo →')}
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-heading text-[13px] font-semibold text-pac-cyan-light"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* CTA */}
      <section className="px-8 pb-[110px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-[1240px] flex-col items-center gap-[26px] rounded-[28px] p-[80px_60px] text-center"
          style={{ background: 'linear-gradient(160deg,#152A57,#0D1730)' }}
        >
          <h2 className="m-0 max-w-[700px] text-balance font-heading text-[clamp(28px,4.5vw,44px)] font-bold leading-[1.2] text-white">
            {t('Votre projet pourrait être le prochain', 'Your project could be next')}
          </h2>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.7] text-pac-muted">
            {t(
              'Parlons de vos objectifs et voyons comment les atteindre ensemble.',
              "Let's talk about your goals and how to reach them together."
            )}
          </p>
          <MotionLink
            to="/contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-gradient-to-br from-pac-cyan to-pac-blue px-9 py-4 font-heading text-[15px] font-bold text-white"
          >
            {t('Démarrer un projet', 'Start a project')}
          </MotionLink>
        </motion.div>
      </section>
    </main>
  )
}
