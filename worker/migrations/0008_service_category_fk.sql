ALTER TABLE services ADD COLUMN category_id INTEGER REFERENCES categories(id);
