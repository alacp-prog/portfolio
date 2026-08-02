const ID_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ID_LENGTH = 8;
const MAX_ID_ATTEMPTS = 5;

function generateServiceId(): string {
  const bytes = new Uint8Array(ID_LENGTH);
  crypto.getRandomValues(bytes);
  let id = "";
  for (let i = 0; i < ID_LENGTH; i++) {
    id += ID_ALPHABET[bytes[i] % ID_ALPHABET.length];
  }
  return id;
}

function isIdCollision(error: unknown): boolean {
  return error instanceof Error && /UNIQUE constraint failed: services\.id/i.test(error.message);
}

function parseRow(row: Record<string, unknown>) {
  return {
    ...row,
    problems: typeof row.problems === "string" ? JSON.parse(row.problems) : [],
  };
}

export class ServiceRepository {
  constructor(private db: D1Database) {}

  async findAll() {
    const { results } = await this.db
      .prepare(
        `SELECT services.*, service_categories.name AS category_name, service_categories.slug AS category_slug
         FROM services
         LEFT JOIN service_categories ON service_categories.id = services.category_id
         ORDER BY services.created_at DESC`
      )
      .all();

    return results.map((row) => parseRow(row as Record<string, unknown>));
  }

  async findById(id: string) {
    const row = await this.db
      .prepare(
        `SELECT services.*, service_categories.name AS category_name, service_categories.slug AS category_slug
         FROM services
         LEFT JOIN service_categories ON service_categories.id = services.category_id
         WHERE services.id = ?`
      )
      .bind(id)
      .first();

    return row ? parseRow(row as Record<string, unknown>) : row;
  }

  async findPublicByCategorySlug(categorySlug: string) {
    const { results } = await this.db
      .prepare(
        `SELECT services.name, services.slug, services.description, services.problems, services.image, services.is_new
         FROM services
         JOIN service_categories ON service_categories.id = services.category_id
         WHERE service_categories.slug = ? AND services.visible = 1
         ORDER BY services.created_at DESC`
      )
      .bind(categorySlug)
      .all();

    return results.map((row) => parseRow(row as Record<string, unknown>));
  }

  async create(data: {
    categoryId: string;
    name: string;
    slug: string;
    problems: string[];
    description?: string;
    image?: string;
    isNew: boolean;
    visible: boolean;
  }): Promise<string> {
    for (let attempt = 0; attempt < MAX_ID_ATTEMPTS; attempt++) {
      const id = generateServiceId();
      try {
        await this.db
          .prepare(
            `INSERT INTO services (id, category_id, name, slug, problems, description, image, is_new, visible)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            id,
            data.categoryId,
            data.name,
            data.slug,
            JSON.stringify(data.problems),
            data.description ?? null,
            data.image ?? null,
            data.isNew ? 1 : 0,
            data.visible ? 1 : 0
          )
          .run();
        return id;
      } catch (error) {
        if (isIdCollision(error) && attempt < MAX_ID_ATTEMPTS - 1) continue;
        throw error;
      }
    }
    throw new Error("Unable to generate a unique service id");
  }

  async update(
    id: string,
    data: {
      categoryId?: string;
      name?: string;
      slug?: string;
      problems?: string[];
      description?: string;
      image?: string;
      isNew?: boolean;
      visible?: boolean;
    }
  ) {
    const fields: string[] = ["updated_at = CURRENT_TIMESTAMP"];
    const values: unknown[] = [];

    if (data.categoryId !== undefined) {
      fields.push("category_id = ?");
      values.push(data.categoryId);
    }
    if (data.name !== undefined) {
      fields.push("name = ?");
      values.push(data.name);
    }
    if (data.slug !== undefined) {
      fields.push("slug = ?");
      values.push(data.slug);
    }
    if (data.problems !== undefined) {
      fields.push("problems = ?");
      values.push(JSON.stringify(data.problems));
    }
    if (data.description !== undefined) {
      fields.push("description = ?");
      values.push(data.description);
    }
    if (data.image !== undefined) {
      fields.push("image = ?");
      values.push(data.image);
    }
    if (data.visible !== undefined) {
      fields.push("visible = ?");
      values.push(data.visible ? 1 : 0);
    }
    if (data.isNew !== undefined) {
      fields.push("is_new = ?");
      values.push(data.isNew ? 1 : 0);
    }

    values.push(id);

    return await this.db
      .prepare(`UPDATE services SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
  }

  async delete(id: string) {
    return await this.db
      .prepare("DELETE FROM services WHERE id = ?")
      .bind(id)
      .run();
  }
}
