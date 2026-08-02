import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageSquare, WarningCircle } from '@phosphor-icons/react'
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from './ui/Drawer'
import { Field, Input, Textarea, Select } from './ui/Field'
import Button from './ui/Button'
import { uploadImage } from '../services/api'

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function ServiceFormDrawer({ service, categories = [], onSave, onCancel, saving, errors }) {
  const isEditing = Boolean(service)

  const [name, setName] = useState(service?.name ?? '')
  const [slug, setSlug] = useState(service?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(isEditing)
  const [categoryId, setCategoryId] = useState(service?.category_id ?? categories[0]?.id ?? '')
  const [description, setDescription] = useState(service?.description ?? '')
  const [problems, setProblems] = useState((service?.problems ?? []).join(', '))
  const [image, setImage] = useState(service?.image ?? '')
  const [visible, setVisible] = useState(service ? Boolean(service.visible) : true)
  const [isNew, setIsNew] = useState(service ? Boolean(service.is_new) : false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  function handleNameChange(e) {
    const value = e.target.value
    setName(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  function handleSlugChange(e) {
    setSlugTouched(true)
    setSlug(e.target.value)
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError(null)
    try {
      const result = await uploadImage(file)
      setImage(result.url)
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setUploading(false)
    }
  }

  function handleSubmit() {
    if (!name.trim() || !slug.trim() || !categoryId) return
    onSave({
      categoryId,
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      problems: problems
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean),
      image: image.trim() || undefined,
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

        <Field label="Nom">
          <Input value={name} onChange={handleNameChange} placeholder="Design UI/UX, Développement web…" />
        </Field>

        <Field label="Slug" hint="Identifiant utilisé dans les URLs, généré automatiquement depuis le nom">
          <Input value={slug} onChange={handleSlugChange} placeholder="design-ui-ux" />
        </Field>

        <Field label="Catégorie">
          <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {categories.length === 0 && <option value="">Aucune catégorie disponible</option>}
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Description" hint="Optionnel">
          <Textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez ce que comprend ce service…"
          />
        </Field>

        <Field label="Problèmes résolus (séparés par des virgules)" hint="Optionnel">
          <Textarea
            rows={3}
            value={problems}
            onChange={(e) => setProblems(e.target.value)}
            placeholder="Manque de visibilité en ligne, Difficulté à recevoir des réservations…"
          />
        </Field>

        <Field label="Image" hint={uploading ? 'Envoi en cours…' : undefined} error={uploadError}>
          <div className="flex items-center gap-3">
            {image ? (
              <img src={image} alt="" className="h-14 w-14 flex-none rounded-[9px] border border-border object-cover" />
            ) : (
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-[9px] border border-dashed border-border text-ink-300">
                <ImageSquare size={20} />
              </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://…" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="text-[12px] text-ink-400 file:mr-2 file:rounded-md file:border-0 file:bg-surface-muted file:px-2.5 file:py-1.5 file:text-[12px] file:font-semibold file:text-ink-600 cursor-pointer"
              />
            </div>
          </div>
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
        <Button className="flex-1 justify-center py-3" onClick={handleSubmit} disabled={saving || !categoryId}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </DrawerFooter>
    </Drawer>
  )
}
