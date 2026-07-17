import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlass, PencilSimple, TrashSimple, Plus, SquaresFour } from '@phosphor-icons/react'
import { PROJECT_CATEGORIES, getCategoryMeta } from '../lib/constants'
import { staggerContainer, staggerItem } from '../lib/motion'
import StatCard from './ui/StatCard'
import Badge from './ui/Badge'
import Button from './ui/Button'
import IconButton from './ui/IconButton'
import Skeleton from './ui/Skeleton'

const GRID_COLS = '1.4fr 0.7fr 0.7fr 1.6fr 88px'

export default function ProjectsPanel({ projects, loading, onNew, onEdit, onDelete, canEdit = true }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const countWeb = projects.filter((p) => (p.category ?? '').toLowerCase() === 'web').length
  const countMobile = projects.filter((p) => (p.category ?? '').toLowerCase() === 'mobile').length
  const countOther = projects.length - countWeb - countMobile

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects
      .filter((p) => filter === 'all' || (p.category ?? '').toLowerCase() === filter)
      .filter((p) => !q || `${p.title} ${p.description ?? ''}`.toLowerCase().includes(q))
  }, [projects, query, filter])

  return (
    <div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        <StatCard label="Total projets" value={projects.length} loading={loading} />
        <StatCard label="Web" value={countWeb} loading={loading} />
        <StatCard label="Mobile" value={countMobile} loading={loading} />
        <StatCard label="Autres" value={countOther} loading={loading} />
      </motion.div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 md:flex-row md:items-center md:justify-between md:px-[22px]">
          <span className="font-heading text-[15px] font-bold text-ink-900">Tous les projets</span>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative sm:w-[220px]">
              <label htmlFor="projects-search" className="sr-only">
                Rechercher un projet
              </label>
              <MagnifyingGlass size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
              <input
                id="projects-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un projet…"
                className="w-full rounded-lg border border-border bg-surface-subtle py-[9px] pl-[30px] pr-3 text-[13px] text-ink-900 outline-none transition-colors focus:border-brand-blue focus:bg-surface"
              />
            </div>
            <label htmlFor="projects-filter" className="sr-only">
              Filtrer par catégorie
            </label>
            <select
              id="projects-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="cursor-pointer rounded-lg border border-border bg-surface-subtle px-3 py-[9px] text-[13px] text-ink-900 outline-none"
            >
              <option value="all">Toutes catégories</option>
              {PROJECT_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {canEdit && (
              <Button onClick={onNew} className="justify-center">
                <Plus size={14} weight="bold" />
                Nouveau projet
              </Button>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b border-border-soft px-5 py-4 md:px-[22px]">
                <Skeleton className="h-4 flex-[1.4]" />
                <Skeleton className="h-5 w-16 flex-none rounded-full" />
                <Skeleton className="h-4 flex-[0.7]" />
                <Skeleton className="hidden h-4 flex-[1.6] md:block" />
              </div>
            ))}
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div
            className="hidden gap-3 border-b border-border bg-surface-subtle px-[22px] py-[11px] text-[11.5px] font-bold uppercase tracking-[0.6px] text-ink-400 md:grid"
            style={{ gridTemplateColumns: GRID_COLS }}
          >
            <span>Projet</span>
            <span>Catégorie</span>
            <span>Année</span>
            <span>Description</span>
            <span></span>
          </div>
        )}

        {!loading && (
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => {
                const meta = getCategoryMeta(p.category)
                return (
                  <motion.div
                    key={p.id}
                    layout
                    variants={staggerItem}
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.18 } }}
                    className="border-b border-border-soft px-5 py-4 transition-colors hover:bg-surface-subtle md:px-[22px] md:py-[15px]"
                  >
                    <div className="hidden items-center gap-3 md:grid" style={{ gridTemplateColumns: GRID_COLS }}>
                      <span className="min-w-0 truncate font-heading text-[14px] font-semibold text-ink-900">{p.title}</span>
                      <Badge label={meta.label} textClass={meta.textClass} bgClass={meta.bgClass} />
                      <span className="min-w-0 truncate text-[13px] text-ink-600">{p.year ?? '—'}</span>
                      <span className="min-w-0 truncate text-[13px] text-ink-600">{p.description}</span>
                      <div className="flex justify-end gap-1.5">
                        {canEdit && (
                          <>
                            <IconButton label="Éditer" onClick={() => onEdit(p)}>
                              <PencilSimple size={15} />
                            </IconButton>
                            <IconButton label="Supprimer" variant="danger" onClick={() => onDelete(p)}>
                              <TrashSimple size={15} />
                            </IconButton>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:hidden">
                      <div className="flex items-start justify-between gap-3">
                        <span className="min-w-0 truncate font-heading text-[14px] font-semibold text-ink-900">{p.title}</span>
                        {canEdit && (
                          <div className="flex flex-none gap-1.5">
                            <IconButton label="Éditer" onClick={() => onEdit(p)}>
                              <PencilSimple size={15} />
                            </IconButton>
                            <IconButton label="Supprimer" variant="danger" onClick={() => onDelete(p)}>
                              <TrashSimple size={15} />
                            </IconButton>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge label={meta.label} textClass={meta.textClass} bgClass={meta.bgClass} />
                        <span className="text-[12.5px] text-ink-400">{p.year ?? '—'}</span>
                      </div>
                      {p.description && <p className="text-[13px] text-ink-600">{p.description}</p>}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-5 py-14 text-center text-ink-300">
            <SquaresFour size={26} />
            <span className="text-[14px]">
              {projects.length === 0 ? 'Aucun projet pour le moment.' : 'Aucun résultat pour ce filtre.'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
