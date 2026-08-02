import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MagnifyingGlass,
  PencilSimple,
  TrashSimple,
  Plus,
  Sparkle,
  Eye,
  EyeSlash,
  Rows,
  GridFour,
  CaretDown,
  CaretRight,
  Tag,
  Lightbulb,
  X,
} from '@phosphor-icons/react'
import { staggerContainer, staggerItem } from '../lib/motion'
import Button from './ui/Button'
import IconButton from './ui/IconButton'
import Skeleton from './ui/Skeleton'
import Badge from './ui/Badge'
import AnimatedNumber from './ui/AnimatedNumber'

const GRID_COLS = '52px 1.3fr 1.4fr 88px'

const VISIBILITY_OPTIONS = [
  { value: 'all', label: 'Toute visibilité' },
  { value: 'visible', label: 'Visibles' },
  { value: 'hidden', label: 'Masqués' },
]

const NEW_OPTIONS = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'new', label: 'Nouveaux' },
  { value: 'regular', label: 'Standards' },
]

function IconSelect({ icon: Icon, id, label, value, onChange, options }) {
  return (
    <div className="relative sm:w-[172px]">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Icon size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-surface-subtle py-[9px] pl-[30px] pr-8 text-[13px] text-ink-900 outline-none transition-colors focus:border-brand-blue focus:bg-surface"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <CaretDown size={11} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-300" />
    </div>
  )
}

function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 py-1 pl-3 pr-1.5 text-[12px] font-semibold text-brand-blue">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Retirer le filtre ${label}`}
        className="flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:bg-brand-blue/20 cursor-pointer"
      >
        <X size={9} weight="bold" />
      </button>
    </span>
  )
}

function ViewToggle({ mode, onChange }) {
  const options = [
    { value: 'list', label: 'Vue liste', icon: Rows },
    { value: 'grid', label: 'Vue grille', icon: GridFour },
  ]
  return (
    <div
      role="radiogroup"
      aria-label="Mode d'affichage"
      className="inline-flex flex-none items-center gap-0.5 rounded-lg border border-border bg-surface-subtle p-0.5"
    >
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={mode === value}
          title={label}
          onClick={() => onChange(value)}
          className={`flex h-8 w-8 items-center justify-center rounded-[7px] transition-colors duration-150 cursor-pointer ${
            mode === value ? 'bg-surface text-brand-blue shadow-card' : 'text-ink-400 hover:text-ink-600'
          }`}
        >
          <Icon size={15} weight={mode === value ? 'bold' : 'regular'} />
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  )
}

function NavStatCard({ icon: Icon, label, value, loading, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group flex w-full max-w-[300px] items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 text-left shadow-card transition-colors duration-150 hover:border-brand-blue/40 hover:bg-surface-subtle hover:shadow-popover cursor-pointer"
    >
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-blue/15 text-brand-blue transition-transform duration-150 group-hover:scale-105">
        <Icon size={20} weight="bold" />
      </span>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-[12px] font-semibold text-ink-400">{label}</span>
        {loading ? (
          <Skeleton className="h-[24px] w-10" />
        ) : (
          <span className="font-heading text-[22px] font-bold leading-none text-ink-900">
            <AnimatedNumber value={value} />
          </span>
        )}
      </div>
      <CaretRight
        size={16}
        weight="bold"
        className="flex-none text-ink-300 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-brand-blue"
      />
    </motion.button>
  )
}

function ServiceBadges({ service }) {
  return (
    <>
      {Boolean(service.is_new) && <Badge label="Nouveau" textClass="text-success" bgClass="bg-success-bg" />}
      {!service.visible && <Badge label="Masqué" textClass="text-danger" bgClass="bg-danger-bg" />}
    </>
  )
}

export default function ServicesPanel({
  services,
  categoriesCount = 0,
  solutionsCount = 0,
  loading,
  onNew,
  onEdit,
  onDelete,
  canEdit = true,
}) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [visibilityFilter, setVisibilityFilter] = useState('all') // all | visible | hidden
  const [newFilter, setNewFilter] = useState('all') // all | new | regular
  const [viewMode, setViewMode] = useState('list') // list | grid

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return services.filter((s) => {
      const matchesQuery = !q || s.name.toLowerCase().includes(q) || (s.description ?? '').toLowerCase().includes(q)
      const matchesVisibility =
        visibilityFilter === 'all' || (visibilityFilter === 'visible' ? Boolean(s.visible) : !s.visible)
      const matchesNew = newFilter === 'all' || (newFilter === 'new' ? Boolean(s.is_new) : !s.is_new)
      return matchesQuery && matchesVisibility && matchesNew
    })
  }, [services, query, visibilityFilter, newFilter])

  const filtersActive = query.trim() !== '' || visibilityFilter !== 'all' || newFilter !== 'all'

  function resetFilters() {
    setQuery('')
    setVisibilityFilter('all')
    setNewFilter('all')
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-4">
        <NavStatCard
          icon={Tag}
          label="Catégories"
          value={categoriesCount}
          loading={loading}
          onClick={() => navigate('/dashboard/categories')}
        />
        <NavStatCard
          icon={Lightbulb}
          label="Solutions"
          value={solutionsCount}
          loading={loading}
          onClick={() => navigate('/dashboard/solutions')}
        />
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <span className="flex-none text-[13.5px] text-ink-600">
          {loading ? (
            <Skeleton className="h-4 w-24" />
          ) : filtersActive ? (
            `${filtered.length} / ${services.length} service(s)`
          ) : (
            `${services.length} service(s)`
          )}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 md:flex-row md:items-center md:justify-between md:px-[22px]">
          <div className="flex items-center gap-3">
            <span className="font-heading text-[15px] font-bold text-ink-900">Tous les services</span>
            <ViewToggle mode={viewMode} onChange={setViewMode} />
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative sm:w-[200px]">
              <label htmlFor="services-search" className="sr-only">
                Rechercher un service
              </label>
              <MagnifyingGlass size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
              <input
                id="services-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un service…"
                className="w-full rounded-lg border border-border bg-surface-subtle py-[9px] pl-[30px] pr-3 text-[13px] text-ink-900 outline-none transition-colors focus:border-brand-blue focus:bg-surface"
              />
            </div>

            <IconSelect
              id="services-filter-visibility"
              label="Filtrer par visibilité"
              icon={Eye}
              value={visibilityFilter}
              onChange={(e) => setVisibilityFilter(e.target.value)}
              options={VISIBILITY_OPTIONS}
            />

            <IconSelect
              id="services-filter-new"
              label="Filtrer par statut"
              icon={Sparkle}
              value={newFilter}
              onChange={(e) => setNewFilter(e.target.value)}
              options={NEW_OPTIONS}
            />

            {canEdit && (
              <Button onClick={onNew} aria-label="Nouveau service" title="Nouveau service" className="h-9 w-9 flex-none justify-center px-0">
                <Plus size={16} weight="bold" />
              </Button>
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {filtersActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-b border-border-soft bg-surface-subtle"
            >
              <div className="flex flex-wrap items-center gap-2 px-5 py-3 md:px-[22px]">
                {query.trim() && <FilterChip label={`« ${query.trim()} »`} onRemove={() => setQuery('')} />}
                {visibilityFilter !== 'all' && (
                  <FilterChip
                    label={visibilityFilter === 'visible' ? 'Visibles' : 'Masqués'}
                    onRemove={() => setVisibilityFilter('all')}
                  />
                )}
                {newFilter !== 'all' && (
                  <FilterChip label={newFilter === 'new' ? 'Nouveaux' : 'Standards'} onRemove={() => setNewFilter('all')} />
                )}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-auto whitespace-nowrap text-[12px] font-semibold text-ink-400 transition-colors hover:text-ink-600 cursor-pointer"
                >
                  Tout effacer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading && viewMode === 'list' && (
          <div className="flex flex-col">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b border-border-soft px-5 py-4 md:px-[22px]">
                <Skeleton className="h-8 w-8 flex-none rounded-lg" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 flex-[1.6]" />
              </div>
            ))}
          </div>
        )}

        {loading && viewMode === 'grid' && (
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 md:p-[22px]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-subtle p-4">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            ))}
          </div>
        )}

        {!loading && viewMode === 'list' && services.length > 0 && (
          <div
            className="hidden gap-3 border-b border-border bg-surface-subtle px-[22px] py-[11px] text-[11.5px] font-bold uppercase tracking-[0.6px] text-ink-400 md:grid"
            style={{ gridTemplateColumns: GRID_COLS }}
          >
            <span></span>
            <span>Nom</span>
            <span>Description</span>
            <span></span>
          </div>
        )}

        {!loading && viewMode === 'list' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <AnimatePresence mode="popLayout">
              {filtered.map((s) => (
                <motion.div
                  key={s.id}
                  layout
                  variants={staggerItem}
                  exit={{ opacity: 0, height: 0, transition: { duration: 0.18 } }}
                  className={`border-b border-border-soft px-5 py-4 transition-colors hover:bg-surface-subtle md:px-[22px] md:py-[15px] ${
                    s.visible ? '' : 'opacity-60'
                  }`}
                >
                  <div className="hidden items-center gap-3 md:grid" style={{ gridTemplateColumns: GRID_COLS }}>
                    {s.image ? (
                      <img src={s.image} alt="" className="h-8 w-8 flex-none rounded-lg object-cover" />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-brand-blue/10 font-heading text-[14px] font-bold text-brand-blue"
                      >
                        ◐
                      </span>
                    )}
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="min-w-0 truncate font-heading text-[14px] font-semibold text-ink-900">{s.name}</span>
                      {(Boolean(s.is_new) || !s.visible || s.category_name) && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {s.category_name && (
                            <Badge label={s.category_name} textClass="text-brand-blue" bgClass="bg-brand-blue/10" />
                          )}
                          <ServiceBadges service={s} />
                        </div>
                      )}
                    </div>
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
                      <div className="flex min-w-0 items-center gap-2.5">
                        {s.image ? (
                          <img src={s.image} alt="" className="h-8 w-8 flex-none rounded-lg object-cover" />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-brand-blue/10 font-heading text-[14px] font-bold text-brand-blue"
                          >
                            ◐
                          </span>
                        )}
                        <div className="flex min-w-0 flex-col gap-1">
                          <span className="min-w-0 truncate font-heading text-[14px] font-semibold text-ink-900">{s.name}</span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {s.category_name && (
                              <Badge label={s.category_name} textClass="text-brand-blue" bgClass="bg-brand-blue/10" />
                            )}
                            <ServiceBadges service={s} />
                          </div>
                        </div>
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

        {!loading && viewMode === 'grid' && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 md:p-[22px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((s) => (
                <motion.div
                  key={s.id}
                  layout
                  variants={staggerItem}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                  whileHover={{ y: -3 }}
                  className={`flex flex-col gap-3 rounded-2xl border border-border bg-surface-subtle p-4 transition-colors hover:border-brand-blue/40 hover:bg-surface hover:shadow-card ${
                    s.visible ? '' : 'opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    {s.image ? (
                      <img src={s.image} alt="" className="h-10 w-10 flex-none rounded-xl object-cover" />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-blue/10 font-heading text-[17px] font-bold text-brand-blue"
                      >
                        ◐
                      </span>
                    )}
                    {canEdit && (
                      <div className="flex flex-none gap-1.5">
                        <IconButton label="Éditer" onClick={() => onEdit(s)}>
                          <PencilSimple size={14} />
                        </IconButton>
                        <IconButton label="Supprimer" variant="danger" onClick={() => onDelete(s)}>
                          <TrashSimple size={14} />
                        </IconButton>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="m-0 min-w-0 truncate font-heading text-[14.5px] font-semibold text-ink-900">{s.name}</h3>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {s.category_name && (
                        <Badge label={s.category_name} textClass="text-brand-blue" bgClass="bg-brand-blue/10" />
                      )}
                      <ServiceBadges service={s} />
                    </div>
                    <p className="m-0 line-clamp-3 text-[13px] leading-[1.6] text-ink-600">{s.description}</p>
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
              {services.length === 0 ? 'Aucun service pour le moment.' : 'Aucun résultat pour ces filtres.'}
            </span>
            {filtersActive && services.length > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[13px] font-semibold text-brand-blue hover:underline cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
