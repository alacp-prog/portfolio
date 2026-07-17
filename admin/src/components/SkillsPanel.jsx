import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlass, PencilSimple, TrashSimple, Plus, Sparkle } from '@phosphor-icons/react'
import { staggerContainer, staggerItem } from '../lib/motion'
import Button from './ui/Button'
import IconButton from './ui/IconButton'
import Skeleton from './ui/Skeleton'

const GRID_COLS = '1.6fr 1.4fr 88px'

export default function SkillsPanel({ skills, loading, onNew, onEdit, onDelete, canEdit = true }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return skills.filter((s) => !q || s.name.toLowerCase().includes(q))
  }, [skills, query])

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <span className="flex-none text-[13.5px] text-ink-600">
          {loading ? <Skeleton className="h-4 w-24" /> : `${skills.length} compétence(s)`}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 md:flex-row md:items-center md:justify-between md:px-[22px]">
          <span className="font-heading text-[15px] font-bold text-ink-900">Toutes les compétences</span>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative sm:w-[220px]">
              <label htmlFor="skills-search" className="sr-only">
                Rechercher une compétence
              </label>
              <MagnifyingGlass size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
              <input
                id="skills-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une compétence…"
                className="w-full rounded-lg border border-border bg-surface-subtle py-[9px] pl-[30px] pr-3 text-[13px] text-ink-900 outline-none transition-colors focus:border-brand-blue focus:bg-surface"
              />
            </div>
            {canEdit && (
              <Button onClick={onNew} className="justify-center">
                <Plus size={14} weight="bold" />
                Nouvelle compétence
              </Button>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b border-border-soft px-5 py-4 md:px-[22px]">
                <Skeleton className="h-4 flex-[1.6]" />
                <Skeleton className="h-2 flex-[1.4] rounded-full" />
              </div>
            ))}
          </div>
        )}

        {!loading && skills.length > 0 && (
          <div
            className="hidden gap-3 border-b border-border bg-surface-subtle px-[22px] py-[11px] text-[11.5px] font-bold uppercase tracking-[0.6px] text-ink-400 md:grid"
            style={{ gridTemplateColumns: GRID_COLS }}
          >
            <span>Compétence</span>
            <span>Niveau</span>
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
                    <span className="min-w-0 truncate font-heading text-[14px] font-semibold text-ink-900">{s.name}</span>
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-border-soft">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.level ?? 0}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue"
                        />
                      </div>
                      <span className="w-[34px] flex-none text-right text-[12px] font-semibold text-ink-600">
                        {s.level ?? 0}%
                      </span>
                    </div>
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
                      <span className="min-w-0 truncate font-heading text-[14px] font-semibold text-ink-900">{s.name}</span>
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
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-border-soft">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.level ?? 0}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue"
                        />
                      </div>
                      <span className="w-[34px] flex-none text-right text-[12px] font-semibold text-ink-600">
                        {s.level ?? 0}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-5 py-14 text-center text-ink-300">
            <Sparkle size={26} />
            <span className="text-[14px]">
              {skills.length === 0 ? 'Aucune compétence pour le moment.' : 'Aucun résultat pour cette recherche.'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
