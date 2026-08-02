const ID_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ID_LENGTH = 8;
const MAX_ID_ATTEMPTS = 5;

function generateServiceSolutionId(): string {
  const bytes = new Uint8Array(ID_LENGTH);
  crypto.getRandomValues(bytes);
  let id = "";
  for (let i = 0; i < ID_LENGTH; i++) {
    id += ID_ALPHABET[bytes[i] % ID_ALPHABET.length];
  }
  return id;
}

function isIdCollision(error: unknown): boolean {
  return error instanceof Error && /UNIQUE constraint failed: service_solutions\.id/i.test(error.message);
}

const SELECT_WITH_NAMES = `
  SELECT
    service_solutions.*,
    services.name AS service_name,
    services.slug AS service_slug,
    solutions.name AS solution_name,
    solutions.slug AS solution_slug
  FROM service_solutions
  JOIN services ON services.id = service_solutions.service_id
  JOIN solutions ON solutions.id = service_solutions.solution_id
`;

export class ServiceSolutionRepository {
  constructor(private db: D1Database) {}

  async findAll() {
    const { results } = await this.db
      .prepare(`${SELECT_WITH_NAMES} ORDER BY service_solutions.created_at DESC`)
      .all();

    return results;
  }

  async findByServiceId(serviceId: string) {
    const { results } = await this.db
      .prepare(`${SELECT_WITH_NAMES} WHERE service_solutions.service_id = ? ORDER BY service_solutions.created_at DESC`)
      .bind(serviceId)
      .all();

    return results;
  }

  async findById(id: string) {
    return await this.db
      .prepare(`${SELECT_WITH_NAMES} WHERE service_solutions.id = ?`)
      .bind(id)
      .first();
  }

  async create(data: {
    serviceId: string;
    solutionId: string;
    description?: string;
    isRecommended: boolean;
  }): Promise<string> {
    for (let attempt = 0; attempt < MAX_ID_ATTEMPTS; attempt++) {
      const id = generateServiceSolutionId();
      try {
        await this.db
          .prepare(
            `INSERT INTO service_solutions (id, service_id, solution_id, description, is_recommended)
             VALUES (?, ?, ?, ?, ?)`
          )
          .bind(
            id,
            data.serviceId,
            data.solutionId,
            data.description ?? null,
            data.isRecommended ? 1 : 0
          )
          .run();
        return id;
      } catch (error) {
        if (isIdCollision(error) && attempt < MAX_ID_ATTEMPTS - 1) continue;
        throw error;
      }
    }
    throw new Error("Unable to generate a unique service_solution id");
  }

  async update(
    id: string,
    data: {
      serviceId?: string;
      solutionId?: string;
      description?: string;
      isRecommended?: boolean;
    }
  ) {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.serviceId !== undefined) {
      fields.push("service_id = ?");
      values.push(data.serviceId);
    }
    if (data.solutionId !== undefined) {
      fields.push("solution_id = ?");
      values.push(data.solutionId);
    }
    if (data.description !== undefined) {
      fields.push("description = ?");
      values.push(data.description);
    }
    if (data.isRecommended !== undefined) {
      fields.push("is_recommended = ?");
      values.push(data.isRecommended ? 1 : 0);
    }

    if (fields.length === 0) return null;

    values.push(id);

    return await this.db
      .prepare(`UPDATE service_solutions SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
  }

  async delete(id: string) {
    return await this.db
      .prepare("DELETE FROM service_solutions WHERE id = ?")
      .bind(id)
      .run();
  }
}
