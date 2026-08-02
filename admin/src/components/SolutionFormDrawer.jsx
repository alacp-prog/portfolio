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

export default function SolutionFormDrawer({ solution, onSave, onCancel, saving, errors }) {
  const isEditing = Boolean(solution)

  const [name, setName] = useState(solution?.name ?? '')
  const [slug, setSlug] = useState(solution?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(isEditing)
  const [description, setDescription] = useState(solution?.description ?? '')
  const [priceType, setPriceType] = useState(solution?.price_type ?? 'quote')
  const [price, setPrice] = useState(solution?.price ?? '')
  const [duration, setDuration] = useState(solution?.duration ?? '')
  const [image, setImage] = useState(solution?.image ?? '')
  const [isNew, setIsNew] = useState(solution ? Boolean(solution.is_new) : false)
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
    if (!name.trim() || !slug.trim()) return
    if (priceType === 'fixed' && price === '') return
    onSave({
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      priceType,
      price: priceType === 'fixed' ? Number(price) : null,
      duration: duration.trim() || undefined,
      image: image.trim() || undefined,
      isNew,
    })
  }

  return (
    <Drawer onClose={onCancel}>
      <DrawerHeader title={isEditing ? 'Éditer la solution' : 'Nouvelle solution'} onClose={onCancel} />

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
          <Input value={name} onChange={handleNameChange} placeholder="Site vitrine, Application mobile…" />
        </Field>

        <Field label="Slug" hint="Identifiant utilisé dans les URLs, généré automatiquement depuis le nom">
          <Input value={slug} onChange={handleSlugChange} placeholder="site-vitrine" />
        </Field>

        <Field label="Description" hint="Optionnel">
          <Textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez cette solution…"
          />
        </Field>

        <Field label="Type de prix">
          <Select value={priceType} onChange={(e) => setPriceType(e.target.value)}>
            <option value="quote">Sur devis</option>
            <option value="fixed">Prix fixe</option>
          </Select>
        </Field>

        {priceType === 'fixed' && (
          <Field label="Prix (DT)">
            <Input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="990.00" />
          </Field>
        )}

        <Field label="Durée estimée" hint="Optionnel">
          <Input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="2 à 4 semaines" />
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
