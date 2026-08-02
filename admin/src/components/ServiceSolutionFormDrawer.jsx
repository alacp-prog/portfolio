import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WarningCircle } from '@phosphor-icons/react'
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from './ui/Drawer'
import { Field, Textarea, Select } from './ui/Field'
import Button from './ui/Button'

export default function ServiceSolutionFormDrawer({ relation, services = [], solutions = [], onSave, onCancel, saving, errors }) {
  const isEditing = Boolean(relation)

  const [serviceId, setServiceId] = useState(relation?.service_id ?? services[0]?.id ?? '')
  const [solutionId, setSolutionId] = useState(relation?.solution_id ?? solutions[0]?.id ?? '')
  const [description, setDescription] = useState(relation?.description ?? '')
  const [isRecommended, setIsRecommended] = useState(relation ? Boolean(relation.is_recommended) : false)

  function handleSubmit() {
    if (!serviceId || !solutionId) return
    onSave({
      serviceId,
      solutionId,
      description: description.trim() || undefined,
      isRecommended,
    })
  }

  return (
    <Drawer onClose={onCancel}>
      <DrawerHeader title={isEditing ? 'Éditer la relation' : 'Nouvelle relation'} onClose={onCancel} />

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

        <Field label="Service">
          <Select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
            {services.length === 0 && <option value="">Aucun service disponible</option>}
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Solution">
          <Select value={solutionId} onChange={(e) => setSolutionId(e.target.value)}>
            {solutions.length === 0 && <option value="">Aucune solution disponible</option>}
            {solutions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Description" hint="Personnalisation de la solution pour ce service (optionnel)">
          <Textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Précisez comment cette solution s'applique à ce service…"
          />
        </Field>

        <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-surface-subtle p-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-ink-600">
            <input
              type="checkbox"
              checked={isRecommended}
              onChange={(e) => setIsRecommended(e.target.checked)}
              className="h-4 w-4 accent-brand-blue"
            />
            Recommandée pour cette activité
            <span className="text-[12px] font-normal text-ink-300">(affiche un badge « Recommandé »)</span>
          </label>
        </div>
      </DrawerBody>

      <DrawerFooter>
        <Button className="flex-1 justify-center py-3" onClick={handleSubmit} disabled={saving || !serviceId || !solutionId}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </DrawerFooter>
    </Drawer>
  )
}
