import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WarningCircle } from '@phosphor-icons/react'
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from './ui/Drawer'
import { Field, Input, Select } from './ui/Field'
import Button from './ui/Button'
import { USER_ROLES } from '../lib/constants'

export default function UserFormDrawer({ user, onSave, onCancel, saving, errors, isSelf }) {
  const isEditing = Boolean(user)

  const [firstName, setFirstName] = useState(user?.first_name ?? '')
  const [lastName, setLastName] = useState(user?.last_name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [role, setRole] = useState(user?.role ?? 'viewer')
  const [isActive, setIsActive] = useState(user ? Boolean(user.is_active) : true)
  const [password, setPassword] = useState('')

  function handleSubmit() {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return
    if (!isEditing && password.length < 8) return

    const data = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      role,
      isActive,
    }
    if (password) data.password = password

    onSave(data)
  }

  return (
    <Drawer onClose={onCancel}>
      <DrawerHeader title={isEditing ? "Éditer l'utilisateur" : 'Nouvel utilisateur'} onClose={onCancel} />

      <DrawerBody>
        <AnimatePresence>
          {errors?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col gap-1 overflow-hidden rounded-xl border border-danger-border bg-danger-bg px-4 py-3 text-[13px] text-danger"
            >
              {errors.map((e) => (
                <div key={e} className="flex items-center gap-2">
                  <WarningCircle size={14} weight="fill" className="flex-none" />
                  {e}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <Field label="Prénom">
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Alex" />
        </Field>

        <Field label="Nom">
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Martin" />
        </Field>

        <Field label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@pixalacode.com"
          />
        </Field>

        <Field label="Rôle">
          <Select value={role} onChange={(e) => setRole(e.target.value)} disabled={isSelf}>
            {USER_ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label={isEditing ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe'}
          hint={isEditing ? 'Laisser vide pour ne pas changer le mot de passe.' : 'Au moins 8 caractères.'}
        >
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </Field>

        <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-ink-600">
          <input
            type="checkbox"
            checked={isActive}
            disabled={isSelf}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 accent-brand-blue"
          />
          Compte actif
          {isSelf && <span className="text-[12px] font-normal text-ink-300">(vous ne pouvez pas modifier votre propre statut)</span>}
        </label>
      </DrawerBody>

      <DrawerFooter>
        <Button className="flex-1 justify-center py-3" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </DrawerFooter>
    </Drawer>
  )
}
