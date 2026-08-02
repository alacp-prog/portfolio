-- Switches categories.id from an auto-incremented integer to a unique 8-character
-- mixed alphanumeric string (0-9, a-z, A-Z), and updates services.category_id to match.

CREATE TABLE categories_id_map (
    old_id INTEGER PRIMARY KEY,
    new_id TEXT NOT NULL
);

INSERT INTO categories_id_map (old_id, new_id)
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
FROM categories;

CREATE TABLE categories_new (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    is_new INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories_new (id, name, slug, description, is_new, created_at)
SELECT m.new_id, c.name, c.slug, c.description, c.is_new, c.created_at
FROM categories c
JOIN categories_id_map m ON m.old_id = c.id;

CREATE TABLE services_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    visible INTEGER NOT NULL DEFAULT 1,
    is_new INTEGER NOT NULL DEFAULT 0,
    category_id TEXT REFERENCES categories_new(id)
);

INSERT INTO services_new (id, title, description, icon, created_at, visible, is_new, category_id)
SELECT s.id, s.title, s.description, s.icon, s.created_at, s.visible, s.is_new, m.new_id
FROM services s
LEFT JOIN categories_id_map m ON m.old_id = s.category_id;

DROP TABLE services;
ALTER TABLE services_new RENAME TO services;

DROP TABLE categories;
ALTER TABLE categories_new RENAME TO categories;

DROP TABLE categories_id_map;

CREATE UNIQUE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
