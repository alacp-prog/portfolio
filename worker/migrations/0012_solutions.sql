CREATE TABLE IF NOT EXISTS solutions (
    id TEXT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    description TEXT,
    price_type TEXT NOT NULL DEFAULT 'quote' CHECK (price_type IN ('fixed', 'quote')),
    price DECIMAL(10, 2),
    duration VARCHAR(100),
    image VARCHAR(255),
    is_new INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_solutions_slug ON solutions(slug);
