export const PROJECT_CATEGORIES = ['web', 'mobile', 'ecom', 'brand']

export function getCategoryLabel(category, t) {
  switch ((category ?? '').toLowerCase()) {
    case 'web':
      return t('Web', 'Web')
    case 'mobile':
      return t('Mobile', 'Mobile')
    case 'ecom':
      return t('E-commerce', 'E-commerce')
    case 'brand':
      return t('Branding', 'Branding')
    default:
      return category || t('Autre', 'Other')
  }
}

export function sortCategories(categories) {
  const present = new Set(categories)
  const known = PROJECT_CATEGORIES.filter((c) => present.has(c))
  const unknown = categories.filter((c) => !PROJECT_CATEGORIES.includes(c))
  return [...known, ...unknown]
}
