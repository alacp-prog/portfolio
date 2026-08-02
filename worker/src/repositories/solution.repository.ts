const ID_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ID_LENGTH = 8;
const MAX_ID_ATTEMPTS = 5;

function generateSolutionId(): string {
  const bytes = new Uint8Array(ID_LENGTH);
  crypto.getRandomValues(bytes);
  let id = "";
  for (let i = 0; i < ID_LENGTH; i++) {
    id += ID_ALPHABET[bytes[i] % ID_ALPHABET.length];
  }
  return id;
}

function isIdCollision(error: unknown): boolean {
  return error instanceof Error && /UNIQUE constraint failed: solutions\.id/i.test(error.message);
}

export class SolutionRepository {
  constructor(private db: D1Database) {}

  async findAll() {
    const { results } = await this.db
      .prepare("SELECT * FROM solutions ORDER BY created_at DESC")
      .all();

    return results;
  }

  async findById(id: string) {
    return await this.db
      .prepare("SELECT * FROM solutions WHERE id = ?")
      .bind(id)
      .first();
  }

  async create(data: {
    name: string;
    slug: string;
    description?: string;
    priceType: "fixed" | "quote";
    price?: number;
    duration?: string;
    image?: string;
    isNew: boolean;
  }): Promise<string> {
    for (let attempt = 0; attempt < MAX_ID_ATTEMPTS; attempt++) {
      const id = generateSolutionId();
      try {
        await this.db
          .prepare(
            `INSERT INTO solutions (id, name, slug, description, price_type, price, duration, image, is_new)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            id,
            data.name,
            data.slug,
            data.description ?? null,
            data.priceType,
            data.price ?? null,
            data.duration ?? null,
            data.image ?? null,
            data.isNew ? 1 : 0
          )
          .run();
        return id;
      } catch (error) {
        if (isIdCollision(error) && attempt < MAX_ID_ATTEMPTS - 1) continue;
        throw error;
      }
    }
    throw new Error("Unable to generate a unique solution id");
  }

  async update(
    id: string,
    data: {
      name?: string;
      slug?: string;
      description?: string;
      priceType?: "fixed" | "quote";
      price?: number | null;
      duration?: string;
      image?: string;
      isNew?: boolean;
    }
  ) {
    const fields: string[] = ["updated_at = CURRENT_TIMESTAMP"];
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
    if (data.priceType !== undefined) {
      fields.push("price_type = ?");
      values.push(data.priceType);
    }
    if (data.price !== undefined) {
      fields.push("price = ?");
      values.push(data.price);
    }
    if (data.duration !== undefined) {
      fields.push("duration = ?");
      values.push(data.duration);
    }
    if (data.image !== undefined) {
      fields.push("image = ?");
      values.push(data.image);
    }
    if (data.isNew !== undefined) {
      fields.push("is_new = ?");
      values.push(data.isNew ? 1 : 0);
    }

    values.push(id);

    return await this.db
      .prepare(`UPDATE solutions SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
  }

  async delete(id: string) {
    return await this.db
      .prepare("DELETE FROM solutions WHERE id = ?")
      .bind(id)
      .run();
  }
}
