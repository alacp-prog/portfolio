import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from './ui/Drawer'
import Button from './ui/Button'

function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11.5px] font-semibold uppercase tracking-[0.5px] text-ink-300">{label}</span>
      <div className="text-[13.5px] leading-[1.6] text-ink-900">{children}</div>
    </div>
  )
}

export default function MessageDetailDrawer({ contact, onClose, onToggleStatus, onDelete, canDelete, updatingStatus }) {
  const isTreated = contact.status === 'treated'

  return (
    <Drawer onClose={onClose}>
      <DrawerHeader title="Détail du message" onClose={onClose} />

      <DrawerBody>
        <div className="flex items-center justify-between gap-3">
          <span
            className={`w-fit rounded-full px-2.5 py-1 font-heading text-[11px] font-semibold ${
              isTreated ? 'bg-success-bg text-success' : 'bg-brand-blue/10 text-brand-blue'
            }`}
          >
            {isTreated ? 'Traité' : 'Nouveau'}
          </span>
          <span className="text-[11.5px] text-ink-300">{formatDate(contact.created_at)}</span>
        </div>

        <Row label="Nom">{contact.name}</Row>

        <Row label="Email">
          <a href={`mailto:${contact.email}`} className="text-brand-blue hover:underline">
            {contact.email}
          </a>
        </Row>

        {contact.phone && (
          <Row label="Téléphone">
            <a href={`tel:${contact.phone}`} className="text-brand-blue hover:underline">
              {contact.phone}
            </a>
          </Row>
        )}

        {contact.category && <Row label="Catégorie">{contact.category}</Row>}

        {contact.service && <Row label="Service">{contact.service}</Row>}

        {(contact.solutions ?? []).length > 0 && (
          <Row label="Solutions souhaitées">
            <div className="flex flex-wrap gap-1.5">
              {contact.solutions.map((sol) => (
                <span key={sol} className="rounded-full border border-border px-2.5 py-1 text-[12px] text-ink-600">
                  {sol}
                </span>
              ))}
            </div>
          </Row>
        )}

        {contact.description && <Row label="Description">{contact.description}</Row>}
      </DrawerBody>

      <DrawerFooter>
        <Button className="flex-1 justify-center py-3" onClick={onToggleStatus} disabled={updatingStatus}>
          {updatingStatus ? 'Mise à jour…' : isTreated ? 'Marquer comme nouveau' : 'Marquer comme traité'}
        </Button>
        {canDelete && (
          <Button variant="outline" onClick={onDelete}>
            Supprimer
          </Button>
        )}
      </DrawerFooter>
    </Drawer>
  )
}
