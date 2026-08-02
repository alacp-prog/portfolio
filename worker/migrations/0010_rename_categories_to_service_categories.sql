ALTER TABLE categories RENAME TO service_categories;

DROP INDEX IF EXISTS idx_categories_slug;
CREATE UNIQUE INDEX IF NOT EXISTS idx_service_categories_slug ON service_categories(slug);
