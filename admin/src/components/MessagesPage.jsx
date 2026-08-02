import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlass, TrashSimple, Envelope, WarningCircle } from '@phosphor-icons/react'
import { staggerContainer, staggerItem } from '../lib/motion'
import { useAuth } from '../context/AuthContext'
import { getContacts, updateContactStatus, deleteContact } from '../services/api'
import IconButton from './ui/IconButton'
import Skeleton from './ui/Skeleton'
import MessageDetailDrawer from './MessageDetailDrawer'

function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(date)
  )
}

export default function MessagesPage() {
  const { user } = useAuth()
  const canDelete = user?.role === 'admin' || user?.role === 'editor'

  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    try {
      const res = await getContacts()
      setContacts(res.data ?? [])
      setLoadError(null)
    } catch (err) {
      setLoadError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(contact) {
    if (!window.confirm(`Supprimer le message de "${contact.name}" ?`)) return
    try {
      await deleteContact(contact.id)
      if (selected?.id === contact.id) setSelected(null)
      await loadAll()
    } catch (err) {
      setLoadError(err.message)
    }
  }

  async function handleToggleStatus() {
    if (!selected) return
    const nextStatus = selected.status === 'treated' ? 'new' : 'treated'
    setUpdatingStatus(true)
    try {
      await updateContactStatus(selected.id, nextStatus)
      setContacts((prev) => prev.map((c) => (c.id === selected.id ? { ...c, status: nextStatus } : c)))
      setSelected((prev) => (prev ? { ...prev, status: nextStatus } : prev))
    } catch (err) {
      setLoadError(err.message)
    } finally {
      setUpdatingStatus(false)
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return contacts.filter(
      (c) =>
        !q ||
        `${c.name} ${c.email} ${c.phone ?? ''} ${c.category ?? ''} ${c.service ?? ''} ${(c.solutions ?? []).join(' ')} ${c.description ?? ''}`
          .toLowerCase()
          .includes(q)
    )
  }, [contacts, query])

  return (
    <div>
      <AnimatePresence>
        {loadError && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto', marginBottom: 20 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="flex items-center gap-2 overflow-hidden rounded-xl border border-danger-border bg-danger-bg px-4 py-3 text-[13px] text-danger"
          >
            <WarningCircle size={16} weight="fill" className="flex-none" />
            Impossible de contacter l'API : {loadError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 md:flex-row md:items-center md:justify-between md:px-[22px]">
          <span className="font-heading text-[15px] font-bold text-ink-900">Messages reçus</span>
          <div className="relative sm:w-[240px]">
            <label htmlFor="messages-search" className="sr-only">
              Rechercher un message
            </label>
            <MagnifyingGlass size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              id="messages-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher…"
              className="w-full rounded-lg border border-border bg-surface-subtle py-[9px] pl-[30px] pr-3 text-[13px] text-ink-900 outline-none transition-colors focus:border-brand-blue focus:bg-surface"
            />
          </div>
        </div>

        {loading && (
          <div className="flex flex-col">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-2 border-b border-border-soft px-5 py-4 md:px-[22px]">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <AnimatePresence mode="popLayout">
              {filtered.map((c) => {
                const isTreated = c.status === 'treated'
                return (
                  <motion.div
                    key={c.id}
                    layout
                    variants={staggerItem}
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.18 } }}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelected(c)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelected(c)}
                    className="flex cursor-pointer flex-col gap-2 border-b border-border-soft px-5 py-4 transition-colors hover:bg-surface-subtle md:px-[22px] md:py-[15px]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span
                            aria-hidden="true"
                            title={isTreated ? 'Traité' : 'Nouveau'}
                            className={`h-1.5 w-1.5 flex-none rounded-full ${isTreated ? 'bg-ink-300' : 'bg-brand-blue'}`}
                          />
                          <span className="font-heading text-[14px] font-semibold text-ink-900">{c.name}</span>
                          <span className="text-[12.5px] text-ink-400">{c.email}</span>
                          {c.phone && <span className="text-[12.5px] text-ink-400">{c.phone}</span>}
                        </div>
                        <span className="text-[11.5px] text-ink-300">{formatDate(c.created_at)}</span>
                      </div>
                      {canDelete && (
                        <IconButton
                          label="Supprimer"
                          variant="danger"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(c)
                          }}
                          className="flex-none"
                        >
                          <TrashSimple size={15} />
                        </IconButton>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {c.category && (
                        <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-[11.5px] font-semibold text-brand-blue">
                          {c.category}
                        </span>
                      )}
                      {c.service && (
                        <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-[11.5px] font-semibold text-ink-600">
                          {c.service}
                        </span>
                      )}
                      {(c.solutions ?? []).map((sol) => (
                        <span key={sol} className="rounded-full border border-border px-2.5 py-1 text-[11.5px] text-ink-500">
                          {sol}
                        </span>
                      ))}
                    </div>
                    {c.description && <p className="line-clamp-2 text-[13px] text-ink-600">{c.description}</p>}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-5 py-14 text-center text-ink-300">
            <Envelope size={26} />
            <span className="text-[14px]">
              {contacts.length === 0 ? 'Aucun message pour le moment.' : 'Aucun résultat pour cette recherche.'}
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <MessageDetailDrawer
            contact={selected}
            onClose={() => setSelected(null)}
            onToggleStatus={handleToggleStatus}
            updatingStatus={updatingStatus}
            canDelete={canDelete}
            onDelete={() => handleDelete(selected)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
