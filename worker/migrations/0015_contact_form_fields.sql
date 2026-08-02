-- Restructures the public contact form submission: replaces the single freeform
-- "message" with a guided flow (phone, category, service, solutions) plus an
-- optional description. Category/service/solutions are stored as the display
-- names picked at submission time (a snapshot), not FKs, so a submitted request
-- stays readable even if the catalog entry is later renamed or removed.

CREATE TABLE contacts_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    category TEXT NOT NULL,
    service TEXT NOT NULL,
    solutions TEXT NOT NULL DEFAULT '[]',
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contacts_new (id, name, email, phone, category, service, solutions, description, created_at)
SELECT id, name, email, '', '', '', '[]', message, created_at FROM contacts;

DROP TABLE contacts;
ALTER TABLE contacts_new RENAME TO contacts;
