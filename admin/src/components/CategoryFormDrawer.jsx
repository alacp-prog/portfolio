import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WarningCircle } from '@phosphor-icons/react'
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from './ui/Drawer'
import { Field, Input, Textarea } from './ui/Field'
import Button from './ui/Button'

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function CategoryFormDrawer({ category, onSave, onCancel, saving, errors }) {
  const isEditing = Boolean(category)

  const [name, setName] = useState(category?.name ?? '')
  const [slug, setSlug] = useState(category?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(isEditing)
  const [description, setDescription] = useState(category?.description ?? '')
  const [isNew, setIsNew] = useState(category ? Boolean(category.is_new) : false)

  function handleNameChange(e) {
    const value = e.target.value
    setName(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  function handleSlugChange(e) {
    setSlugTouched(true)
    setSlug(e.target.value)
  }

  function handleSubmit() {
    if (!name.trim() || !slug.trim()) return
    onSave({
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      isNew,
    })
  }

  return (
    <Drawer onClose={onCancel}>
      <DrawerHeader title={isEditing ? 'Éditer la catégorie' : 'Nouvelle catégorie'} onClose={onCancel} />

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
          <Input value={name} onChange={handleNameChange} placeholder="Design, Développement, Branding…" />
        </Field>

        <Field label="Slug" hint="Identifiant utilisé dans les URLs, généré automatiquement depuis le nom">
          <Input value={slug} onChange={handleSlugChange} placeholder="design" />
        </Field>

        <Field label="Description" hint="Optionnel">
          <Textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez cette catégorie de services…"
          />
        </Field>

        <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-surface-subtle p-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-ink-600">
            <input
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
              className="h-4 w-4 accent-brand-blue"
            />
            Marquer comme nouvelle
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
