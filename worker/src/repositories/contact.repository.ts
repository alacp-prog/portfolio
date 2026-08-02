function parseRow(row: Record<string, unknown>) {
  return {
    ...row,
    solutions: typeof row.solutions === "string" ? JSON.parse(row.solutions) : [],
  };
}

export class ContactRepository {
  constructor(private db: D1Database) {}

  async findAll() {
    const { results } = await this.db
      .prepare("SELECT * FROM contacts ORDER BY created_at DESC")
      .all();

    return results.map((row) => parseRow(row as Record<string, unknown>));
  }

  async findById(id: number) {
    const row = await this.db
      .prepare("SELECT * FROM contacts WHERE id = ?")
      .bind(id)
      .first();

    return row ? parseRow(row as Record<string, unknown>) : row;
  }

  async create(data: {
    name: string;
    email: string;
    phone: string;
    category: string;
    service: string;
    solutions: string[];
    description?: string;
  }) {
    return await this.db
      .prepare(
        "INSERT INTO contacts (name, email, phone, category, service, solutions, description) VALUES (?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        data.name,
        data.email,
        data.phone,
        data.category,
        data.service,
        JSON.stringify(data.solutions),
        data.description ?? null
      )
      .run();
  }

  async updateStatus(id: number, status: "new" | "treated") {
    return await this.db
      .prepare("UPDATE contacts SET status = ? WHERE id = ?")
      .bind(status, id)
      .run();
  }

  async delete(id: number) {
    return await this.db
      .prepare("DELETE FROM contacts WHERE id = ?")
      .bind(id)
      .run();
  }

  // Cross-checks a submitted category/service/solutions combination against the live
  // catalog so the public endpoint can't be used to store arbitrary/spam text in
  // what are meant to be catalog-backed fields.
  async resolveCatalogSelection(
    category: string,
    service: string,
    solutionNames: string[]
  ): Promise<{ categoryValid: boolean; serviceValid: boolean; invalidSolutions: string[] }> {
    const categoryRow = await this.db
      .prepare("SELECT id FROM service_categories WHERE name = ?")
      .bind(category)
      .first<{ id: string }>();

    if (!categoryRow) {
      return { categoryValid: false, serviceValid: false, invalidSolutions: solutionNames };
    }

    const serviceRow = await this.db
      .prepare("SELECT id FROM services WHERE name = ? AND category_id = ? AND visible = 1")
      .bind(service, categoryRow.id)
      .first<{ id: string }>();

    if (!serviceRow) {
      return { categoryValid: true, serviceValid: false, invalidSolutions: solutionNames };
    }

    const { results } = await this.db
      .prepare(
        `SELECT solutions.name AS name
         FROM service_solutions
         JOIN solutions ON solutions.id = service_solutions.solution_id
         WHERE service_solutions.service_id = ?`
      )
      .bind(serviceRow.id)
      .all<{ name: string }>();

    const validNames = new Set(results.map((r) => r.name));
    const invalidSolutions = solutionNames.filter((name) => !validNames.has(name));

    return { categoryValid: true, serviceValid: true, invalidSolutions };
  }
}
