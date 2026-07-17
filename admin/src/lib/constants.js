export const PROJECT_CATEGORIES = [
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'ecom', label: 'E-commerce' },
  { value: 'brand', label: 'Branding' },
]

const CATEGORY_META = {
  web: { label: 'Web', textClass: 'text-cat-web', bgClass: 'bg-cat-web-bg' },
  mobile: { label: 'Mobile', textClass: 'text-cat-mobile', bgClass: 'bg-cat-mobile-bg' },
  ecom: { label: 'E-commerce', textClass: 'text-cat-ecom', bgClass: 'bg-cat-ecom-bg' },
  brand: { label: 'Branding', textClass: 'text-cat-brand', bgClass: 'bg-cat-brand-bg' },
}

const FALLBACK_META = { textClass: 'text-ink-600', bgClass: 'bg-surface-muted' }

export function getCategoryMeta(category) {
  const key = (category ?? '').toLowerCase()
  const meta = CATEGORY_META[key]
  if (meta) return meta
  return { label: category || 'Autre', ...FALLBACK_META }
}

export const USER_ROLES = [
  { value: 'admin', label: 'Administrateur' },
  { value: 'editor', label: 'Éditeur' },
  { value: 'viewer', label: 'Lecteur' },
]

const ROLE_META = {
  admin: { label: 'Administrateur', textClass: 'text-cat-brand', bgClass: 'bg-cat-brand-bg' },
  editor: { label: 'Éditeur', textClass: 'text-cat-web', bgClass: 'bg-cat-web-bg' },
  viewer: { label: 'Lecteur', textClass: 'text-ink-600', bgClass: 'bg-surface-muted' },
}

export function getRoleMeta(role) {
  return ROLE_META[role] ?? { label: role || 'Inconnu', ...FALLBACK_META }
}
