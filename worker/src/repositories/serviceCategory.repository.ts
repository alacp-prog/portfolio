const ID_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ID_LENGTH = 8;
const MAX_ID_ATTEMPTS = 5;

function generateServiceCategoryId(): string {
  const bytes = new Uint8Array(ID_LENGTH);
  crypto.getRandomValues(bytes);
  let id = "";
  for (let i = 0; i < ID_LENGTH; i++) {
    id += ID_ALPHABET[bytes[i] % ID_ALPHABET.length];
  }
  return id;
}

function isIdCollision(error: unknown): boolean {
  return error instanceof Error && /UNIQUE constraint failed: service_categories\.id/i.test(error.message);
}

export class ServiceCategoryRepository {
  constructor(private db: D1Database) {}

  async findAll() {
    const { results } = await this.db
      .prepare("SELECT * FROM service_categories ORDER BY created_at DESC")
      .all();

    return results;
  }

  async findById(id: string) {
    return await this.db
      .prepare("SELECT * FROM service_categories WHERE id = ?")
      .bind(id)
      .first();
  }

  async countLinkedServices(id: string): Promise<number> {
    const row = await this.db
      .prepare("SELECT COUNT(*) AS count FROM services WHERE category_id = ?")
      .bind(id)
      .first<{ count: number }>();

    return row?.count ?? 0;
  }

  async create(data: {
    name: string;
    slug: string;
    description?: string;
    isNew: boolean;
  }): Promise<string> {
    for (let attempt = 0; attempt < MAX_ID_ATTEMPTS; attempt++) {
      const id = generateServiceCategoryId();
      try {
        await this.db
          .prepare(
            "INSERT INTO service_categories (id, name, slug, description, is_new) VALUES (?, ?, ?, ?, ?)"
          )
          .bind(id, data.name, data.slug, data.description ?? null, data.isNew ? 1 : 0)
          .run();
        return id;
      } catch (error) {
        if (isIdCollision(error) && attempt < MAX_ID_ATTEMPTS - 1) continue;
        throw error;
      }
    }
    throw new Error("Unable to generate a unique service category id");
  }

  async update(
    id: string,
    data: {
      name?: string;
      slug?: string;
      description?: string;
      isNew?: boolean;
    }
  ) {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.name !== undefined) {
      fields.push("name = ?");
      values.push(data.name);
    }
    if (data.slug !== undefined) {
      fields.push("slug = ?");
      values.push(data.slug);
    }
    if (data.description !== undefined) {
      fields.push("description = ?");
      values.push(data.description);
    }
    if (data.isNew !== undefined) {
      fields.push("is_new = ?");
      values.push(data.isNew ? 1 : 0);
    }

    if (fields.length === 0) return null;

    values.push(id);

    return await this.db
      .prepare(`UPDATE service_categories SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
  }

  async delete(id: string) {
    return await this.db
      .prepare("DELETE FROM service_categories WHERE id = ?")
      .bind(id)
      .run();
  }
}
