import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WarningCircle } from '@phosphor-icons/react'
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from './ui/Drawer'
import { Field, Input } from './ui/Field'
import Button from './ui/Button'

export default function SkillFormDrawer({ skill, onSave, onCancel, saving, errors }) {
  const isEditing = Boolean(skill)

  const [name, setName] = useState(skill?.name ?? '')
  const [level, setLevel] = useState(skill?.level ?? 50)

  function handleSubmit() {
    if (!name.trim()) return
    onSave({ name: name.trim(), level: Number(level) })
  }

  return (
    <Drawer onClose={onCancel}>
      <DrawerHeader title={isEditing ? 'Éditer la compétence' : 'Nouvelle compétence'} onClose={onCancel} />

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

        <Field label="Nom">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="React, Node.js, Figma…" />
        </Field>

        <Field label={`Niveau (${level}%)`}>
          <input
            type="range"
            min="0"
            max="100"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full accent-brand-blue"
          />
        </Field>
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
