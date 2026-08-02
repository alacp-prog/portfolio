import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlass, PencilSimple, TrashSimple, Plus, Sparkle, EyeSlash } from '@phosphor-icons/react'
import { staggerContainer, staggerItem } from '../lib/motion'
import Button from './ui/Button'
import IconButton from './ui/IconButton'
import Skeleton from './ui/Skeleton'
import Badge from './ui/Badge'

const GRID_COLS = '1.3fr 1fr 1fr 1.2fr 88px'

function formatPrice(s) {
  if (s.price_type === 'fixed') {
    const value = Number(s.price)
    return Number.isFinite(value) ? `${value.toFixed(2)} DT` : '—'
  }
  return 'Sur devis'
}

export default function SolutionsPanel({ solutions, loading, onNew, onEdit, onDelete, canEdit = true }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return solutions
    return solutions.filter(
      (s) => s.name.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q)
    )
  }, [solutions, query])

  const filtersActive = query.trim() !== ''

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <span className="flex-none text-[13.5px] text-ink-600">
          {loading ? (
            <Skeleton className="h-4 w-24" />
          ) : filtersActive ? (
            `${filtered.length} / ${solutions.length} solution(s)`
          ) : (
            `${solutions.length} solution(s)`
          )}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 md:flex-row md:items-center md:justify-between md:px-[22px]">
          <span className="font-heading text-[15px] font-bold text-ink-900">Toutes les solutions</span>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative sm:w-[200px]">
              <label htmlFor="solutions-search" className="sr-only">
                Rechercher une solution
              </label>
              <MagnifyingGlass size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
              <input
                id="solutions-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une solution…"
                className="w-full rounded-lg border border-border bg-surface-subtle py-[9px] pl-[30px] pr-3 text-[13px] text-ink-900 outline-none transition-colors focus:border-brand-blue focus:bg-surface"
              />
            </div>

            {canEdit && (
              <Button onClick={onNew} aria-label="Nouvelle solution" title="Nouvelle solution" className="h-9 w-9 flex-none justify-center px-0">
                <Plus size={16} weight="bold" />
              </Button>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b border-border-soft px-5 py-4 md:px-[22px]">
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 flex-[0.8]" />
                <Skeleton className="h-4 flex-[0.8]" />
                <Skeleton className="h-4 flex-[1.2]" />
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div
            className="hidden gap-3 border-b border-border bg-surface-subtle px-[22px] py-[11px] text-[11.5px] font-bold uppercase tracking-[0.6px] text-ink-400 md:grid"
            style={{ gridTemplateColumns: GRID_COLS }}
          >
            <span>Nom</span>
            <span>Prix</span>
            <span>Durée</span>
            <span>Description</span>
            <span></span>
          </div>
        )}

        {!loading && (
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <AnimatePresence mode="popLayout">
              {filtered.map((s) => (
                <motion.div
                  key={s.id}
                  layout
                  variants={staggerItem}
                  exit={{ opacity: 0, height: 0, transition: { duration: 0.18 } }}
                  className="border-b border-border-soft px-5 py-4 transition-colors hover:bg-surface-subtle md:px-[22px] md:py-[15px]"
                >
                  <div className="hidden items-center gap-3 md:grid" style={{ gridTemplateColumns: GRID_COLS }}>
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="min-w-0 truncate font-heading text-[14px] font-semibold text-ink-900">{s.name}</span>
                      {Boolean(s.is_new) && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Badge label="Nouveau" textClass="text-success" bgClass="bg-success-bg" />
                        </div>
                      )}
                    </div>
                    <span className="min-w-0 truncate text-[13px] text-ink-600">{formatPrice(s)}</span>
                    <span className="min-w-0 truncate text-[13px] text-ink-500">{s.duration || '—'}</span>
                    <span className="min-w-0 truncate text-[13px] text-ink-600">{s.description}</span>
                    <div className="flex justify-end gap-1.5">
                      {canEdit && (
                        <>
                          <IconButton label="Éditer" onClick={() => onEdit(s)}>
                            <PencilSimple size={15} />
                          </IconButton>
                          <IconButton label="Supprimer" variant="danger" onClick={() => onDelete(s)}>
                            <TrashSimple size={15} />
                          </IconButton>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 md:hidden">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-col gap-1">
                        <span className="min-w-0 truncate font-heading text-[14px] font-semibold text-ink-900">{s.name}</span>
                        <span className="text-[12px] text-ink-400">
                          {formatPrice(s)}
                          {s.duration ? ` · ${s.duration}` : ''}
                        </span>
                        {Boolean(s.is_new) && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Badge label="Nouveau" textClass="text-success" bgClass="bg-success-bg" />
                          </div>
                        )}
                      </div>
                      {canEdit && (
                        <div className="flex flex-none gap-1.5">
                          <IconButton label="Éditer" onClick={() => onEdit(s)}>
                            <PencilSimple size={15} />
                          </IconButton>
                          <IconButton label="Supprimer" variant="danger" onClick={() => onDelete(s)}>
                            <TrashSimple size={15} />
                          </IconButton>
                        </div>
                      )}
                    </div>
                    <p className="m-0 text-[13px] leading-[1.6] text-ink-600">{s.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-5 py-14 text-center text-ink-300">
            {filtersActive ? <EyeSlash size={26} /> : <Sparkle size={26} />}
            <span className="text-[14px]">
              {solutions.length === 0 ? 'Aucune solution pour le moment.' : 'Aucun résultat pour cette recherche.'}
            </span>
            {filtersActive && solutions.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-[13px] font-semibold text-brand-blue hover:underline cursor-pointer"
              >
                Réinitialiser la recherche
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
