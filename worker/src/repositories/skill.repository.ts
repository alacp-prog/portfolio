export class SkillRepository {
  constructor(private db: D1Database) {}

  async findAll() {
    const { results } = await this.db
      .prepare("SELECT * FROM skills ORDER BY created_at DESC")
      .all();

    return results;
  }

  async findById(id: number) {
    return await this.db
      .prepare("SELECT * FROM skills WHERE id = ?")
      .bind(id)
      .first();
  }

  async create(data: { name: string; level?: number }) {
    return await this.db
      .prepare("INSERT INTO skills (name, level) VALUES (?, ?)")
      .bind(data.name, data.level ?? 0)
      .run();
  }

  async update(id: number, data: { name?: string; level?: number }) {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.name !== undefined) {
      fields.push("name = ?");
      values.push(data.name);
    }
    if (data.level !== undefined) {
      fields.push("level = ?");
      values.push(data.level);
    }

    if (fields.length === 0) return null;

    values.push(id);

    return await this.db
      .prepare(`UPDATE skills SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
  }

  async delete(id: number) {
    return await this.db
      .prepare("DELETE FROM skills WHERE id = ?")
      .bind(id)
      .run();
  }
}
