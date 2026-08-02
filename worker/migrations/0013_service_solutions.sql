CREATE TABLE IF NOT EXISTS service_solutions (
    id TEXT PRIMARY KEY,
    service_id TEXT NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    solution_id TEXT NOT NULL REFERENCES solutions(id) ON DELETE CASCADE,
    description TEXT,
    is_recommended INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_service_solutions_pair ON service_solutions(service_id, solution_id);
CREATE INDEX IF NOT EXISTS idx_service_solutions_service ON service_solutions(service_id);
CREATE INDEX IF NOT EXISTS idx_service_solutions_solution ON service_solutions(solution_id);
