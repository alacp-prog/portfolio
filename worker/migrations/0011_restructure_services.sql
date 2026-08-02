-- Restructures services: id becomes an 8-char text id (like service_categories),
-- title -> name, adds slug/problems/image/updated_at, drops icon.
-- category_id stays nullable at the DB level (existing services have no category yet);
-- it is enforced as required at the application layer for new services instead.

CREATE TABLE services_id_map (
    old_id INTEGER PRIMARY KEY,
    new_id TEXT NOT NULL
);

INSERT INTO services_id_map (old_id, new_id)
SELECT
    id,
    substr('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', abs(random() % 62) + 1, 1) ||
    substr('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', abs(random() % 62) + 1, 1) ||
    substr('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', abs(random() % 62) + 1, 1) ||
    substr('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', abs(random() % 62) + 1, 1) ||
    substr('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', abs(random() % 62) + 1, 1) ||
    substr('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', abs(random() % 62) + 1, 1) ||
    substr('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', abs(random() % 62) + 1, 1) ||
    substr('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', abs(random() % 62) + 1, 1)
FROM services;

CREATE TABLE services_new (
    id TEXT PRIMARY KEY,
    category_id TEXT REFERENCES service_categories(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    problems TEXT NOT NULL DEFAULT '[]',
    description TEXT,
    image VARCHAR(255),
    is_new INTEGER NOT NULL DEFAULT 0,
    visible INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Legacy rows get a slug derived from their new id (unique, unicode-safe); the human
-- readable name is preserved as-is and can be re-slugged manually via the admin if needed.
INSERT INTO services_new (id, category_id, name, slug, problems, description, image, is_new, visible, created_at, updated_at)
SELECT
    m.new_id,
    s.category_id,
    s.title,
    lower(m.new_id),
    '[]',
    s.description,
    NULL,
    s.is_new,
    s.visible,
    s.created_at,
    s.created_at
FROM services s
JOIN services_id_map m ON m.old_id = s.id;

DROP TABLE services;
ALTER TABLE services_new RENAME TO services;

DROP TABLE services_id_map;

CREATE UNIQUE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
