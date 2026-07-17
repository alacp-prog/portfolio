import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageSquare, WarningCircle } from '@phosphor-icons/react'
import { PROJECT_CATEGORIES } from '../lib/constants'
import { uploadImage } from '../services/api'
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from './ui/Drawer'
import { Field, Input, Textarea, Select } from './ui/Field'
import Button from './ui/Button'

export default function ProjectFormDrawer({ project, onSave, onCancel, saving, errors }) {
  const isEditing = Boolean(project)

  const [title, setTitle] = useState(project?.title ?? '')
  const [category, setCategory] = useState(project?.category ?? 'web')
  const [year, setYear] = useState(project?.year ?? new Date().getFullYear())
  const [description, setDescription] = useState(project?.description ?? '')
  const [image, setImage] = useState(project?.image ?? '')
  const [githubUrl, setGithubUrl] = useState(project?.github_url ?? '')
  const [demoUrl, setDemoUrl] = useState(project?.demo_url ?? '')
  const [stack, setStack] = useState((project?.stack ?? []).join(', '))
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)

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
    if (!title.trim() || !description.trim()) return
    onSave({
      title: title.trim(),
      category,
      year: year ? Number(year) : undefined,
      description: description.trim(),
      image: image.trim() || undefined,
      github_url: githubUrl.trim() || undefined,
      demo_url: demoUrl.trim() || undefined,
      stack: stack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    })
  }

  return (
    <Drawer onClose={onCancel}>
      <DrawerHeader title={isEditing ? 'Éditer le projet' : 'Nouveau projet'} onClose={onCancel} />

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
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nom du projet" />
        </Field>

        <Field label="Catégorie">
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Année">
          <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </Field>

        <Field label="Description">
          <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description courte" />
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

        <Field label="Stack (séparée par des virgules)">
          <Input value={stack} onChange={(e) => setStack(e.target.value)} placeholder="React, Node.js, Tailwind" />
        </Field>

        <Field label="Lien démo">
          <Input value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} placeholder="https://…" />
        </Field>

        <Field label="Lien GitHub">
          <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://…" />
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
