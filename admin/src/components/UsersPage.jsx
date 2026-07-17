import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlass, PencilSimple, TrashSimple, Plus, Users as UsersIcon, WarningCircle } from '@phosphor-icons/react'
import { staggerContainer, staggerItem } from '../lib/motion'
import { getRoleMeta } from '../lib/constants'
import { useAuth } from '../context/AuthContext'
import { getUsers, createUser, updateUser, deleteUser } from '../services/api'
import Badge from './ui/Badge'
import Button from './ui/Button'
import IconButton from './ui/IconButton'
import Skeleton from './ui/Skeleton'
import UserFormDrawer from './UserFormDrawer'

const GRID_COLS = '1.4fr 1.6fr 1fr 0.8fr 88px'

export default function UsersPage() {
  const { user: currentUser } = useAuth()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [query, setQuery] = useState('')

  const [drawer, setDrawer] = useState(null) // null | 'new' | user object
  const [saving, setSaving] = useState(false)
  const [formErrors, setFormErrors] = useState(null)

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    try {
      const res = await getUsers()
      setUsers(res.data ?? [])
      setLoadError(null)
    } catch (err) {
      setLoadError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(data) {
    setSaving(true)
    setFormErrors(null)
    try {
      if (drawer && drawer !== 'new') {
        await updateUser(drawer.id, data)
      } else {
        await createUser(data)
      }
      await loadAll()
      setDrawer(null)
    } catch (err) {
      setFormErrors(err.errors ?? [err.message])
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(user) {
    if (!window.confirm(`Supprimer l'utilisateur "${user.first_name} ${user.last_name}" ?`)) return
    try {
      await deleteUser(user.id)
      await loadAll()
    } catch (err) {
      setLoadError(err.message)
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return users.filter(
      (u) => !q || `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(q)
    )
  }, [users, query])

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
          <span className="font-heading text-[15px] font-bold text-ink-900">Tous les utilisateurs</span>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative sm:w-[220px]">
              <label htmlFor="users-search" className="sr-only">
                Rechercher un utilisateur
              </label>
              <MagnifyingGlass size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
              <input
                id="users-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher…"
                className="w-full rounded-lg border border-border bg-surface-subtle py-[9px] pl-[30px] pr-3 text-[13px] text-ink-900 outline-none transition-colors focus:border-brand-blue focus:bg-surface"
              />
            </div>
            <Button onClick={() => setDrawer('new')} className="justify-center">
              <Plus size={14} weight="bold" />
              Nouvel utilisateur
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b border-border-soft px-5 py-4 md:px-[22px]">
                <Skeleton className="h-4 flex-[1.4]" />
                <Skeleton className="h-4 flex-[1.6]" />
                <Skeleton className="h-5 w-16 flex-none rounded-full" />
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
            <span>Email</span>
            <span>Rôle</span>
            <span>Statut</span>
            <span></span>
          </div>
        )}

        {!loading && (
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <AnimatePresence mode="popLayout">
              {filtered.map((u) => {
                const roleMeta = getRoleMeta(u.role)
                const isSelf = currentUser?.id === u.id
                return (
                  <motion.div
                    key={u.id}
                    layout
                    variants={staggerItem}
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.18 } }}
                    className="border-b border-border-soft px-5 py-4 transition-colors hover:bg-surface-subtle md:px-[22px] md:py-[15px]"
                  >
                    <div className="hidden items-center gap-3 md:grid" style={{ gridTemplateColumns: GRID_COLS }}>
                      <span className="min-w-0 truncate font-heading text-[14px] font-semibold text-ink-900">
                        {u.first_name} {u.last_name}
                        {isSelf && <span className="ml-1.5 text-[11.5px] font-normal text-ink-300">(vous)</span>}
                      </span>
                      <span className="min-w-0 truncate text-[13px] text-ink-600">{u.email}</span>
                      <Badge label={roleMeta.label} textClass={roleMeta.textClass} bgClass={roleMeta.bgClass} />
                      <Badge
                        label={u.is_active ? 'Actif' : 'Inactif'}
                        textClass={u.is_active ? 'text-success' : 'text-danger'}
                        bgClass={u.is_active ? 'bg-success-bg' : 'bg-danger-bg'}
                      />
                      <div className="flex justify-end gap-1.5">
                        <IconButton label="Éditer" onClick={() => setDrawer(u)}>
                          <PencilSimple size={15} />
                        </IconButton>
                        <IconButton
                          label={isSelf ? 'Vous ne pouvez pas supprimer votre propre compte' : 'Supprimer'}
                          variant="danger"
                          disabled={isSelf}
                          onClick={() => handleDelete(u)}
                          className={isSelf ? 'cursor-not-allowed opacity-40' : ''}
                        >
                          <TrashSimple size={15} />
                        </IconButton>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:hidden">
                      <div className="flex items-start justify-between gap-3">
                        <span className="min-w-0 truncate font-heading text-[14px] font-semibold text-ink-900">
                          {u.first_name} {u.last_name}
                          {isSelf && <span className="ml-1.5 text-[11.5px] font-normal text-ink-300">(vous)</span>}
                        </span>
                        <div className="flex flex-none gap-1.5">
                          <IconButton label="Éditer" onClick={() => setDrawer(u)}>
                            <PencilSimple size={15} />
                          </IconButton>
                          <IconButton
                            label={isSelf ? 'Vous ne pouvez pas supprimer votre propre compte' : 'Supprimer'}
                            variant="danger"
                            disabled={isSelf}
                            onClick={() => handleDelete(u)}
                            className={isSelf ? 'cursor-not-allowed opacity-40' : ''}
                          >
                            <TrashSimple size={15} />
                          </IconButton>
                        </div>
                      </div>
                      <span className="text-[12.5px] text-ink-400">{u.email}</span>
                      <div className="flex items-center gap-2">
                        <Badge label={roleMeta.label} textClass={roleMeta.textClass} bgClass={roleMeta.bgClass} />
                        <Badge
                          label={u.is_active ? 'Actif' : 'Inactif'}
                          textClass={u.is_active ? 'text-success' : 'text-danger'}
                          bgClass={u.is_active ? 'bg-success-bg' : 'bg-danger-bg'}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-5 py-14 text-center text-ink-300">
            <UsersIcon size={26} />
            <span className="text-[14px]">
              {users.length === 0 ? 'Aucun utilisateur pour le moment.' : 'Aucun résultat pour cette recherche.'}
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {drawer !== null && (
          <UserFormDrawer
            key={drawer === 'new' ? 'new-user' : drawer.id}
            user={drawer === 'new' ? null : drawer}
            isSelf={drawer !== 'new' && currentUser?.id === drawer.id}
            onSave={handleSave}
            onCancel={() => {
              setDrawer(null)
              setFormErrors(null)
            }}
            saving={saving}
            errors={formErrors}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
