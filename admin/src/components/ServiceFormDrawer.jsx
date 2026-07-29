import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WarningCircle } from '@phosphor-icons/react'
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from './ui/Drawer'
import { Field, Input, Textarea } from './ui/Field'
import Button from './ui/Button'

export default function ServiceFormDrawer({ service, onSave, onCancel, saving, errors }) {
  const isEditing = Boolean(service)

  const [title, setTitle] = useState(service?.title ?? '')
  const [description, setDescription] = useState(service?.description ?? '')
  const [icon, setIcon] = useState(service?.icon ?? '')
  const [visible, setVisible] = useState(service ? Boolean(service.visible) : true)
  const [isNew, setIsNew] = useState(service ? Boolean(service.is_new) : false)

  function handleSubmit() {
    if (!title.trim() || !description.trim()) return
    onSave({
      title: title.trim(),
      description: description.trim(),
      icon: icon.trim() || undefined,
      visible,
      isNew,
    })
  }

  return (
    <Drawer onClose={onCancel}>
      <DrawerHeader title={isEditing ? 'Éditer le service' : 'Nouveau service'} onClose={onCancel} />

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

        <Field label="Titre">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Design UI/UX, Développement web…" />
        </Field>

        <Field label="Description">
          <Textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez ce que comprend ce service…"
          />
        </Field>

        <Field label="Icône" hint="Emoji ou courte chaîne affichée comme pictogramme (optionnel)">
          <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="◐" />
        </Field>

        <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-surface-subtle p-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-ink-600">
            <input
              type="checkbox"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
              className="h-4 w-4 accent-brand-blue"
            />
            Visible sur le site
            <span className="text-[12px] font-normal text-ink-300">(décocher pour masquer sans supprimer)</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-ink-600">
            <input
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
              className="h-4 w-4 accent-brand-blue"
            />
            Marquer comme nouveau
            <span className="text-[12px] font-normal text-ink-300">(affiche un badge « Nouveau »)</span>
          </label>
        </div>
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
