export class ServiceRepository {
  constructor(private db: D1Database) {}

  async findAll() {
    const { results } = await this.db
      .prepare("SELECT * FROM services ORDER BY created_at DESC")
      .all();

    return results;
  }

  async findById(id: number) {
    return await this.db
      .prepare("SELECT * FROM services WHERE id = ?")
      .bind(id)
      .first();
  }

  async create(data: {
    title: string;
    description: string;
    icon?: string;
    visible: boolean;
    isNew: boolean;
  }) {
    return await this.db
      .prepare(
        "INSERT INTO services (title, description, icon, visible, is_new) VALUES (?, ?, ?, ?, ?)"
      )
      .bind(
        data.title,
        data.description,
        data.icon ?? null,
        data.visible ? 1 : 0,
        data.isNew ? 1 : 0
      )
      .run();
  }

  async update(
    id: number,
    data: {
      title?: string;
      description?: string;
      icon?: string;
      visible?: boolean;
      isNew?: boolean;
    }
  ) {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.title !== undefined) {
      fields.push("title = ?");
      values.push(data.title);
    }
    if (data.description !== undefined) {
      fields.push("description = ?");
      values.push(data.description);
    }
    if (data.icon !== undefined) {
      fields.push("icon = ?");
      values.push(data.icon);
    }
    if (data.visible !== undefined) {
      fields.push("visible = ?");
      values.push(data.visible ? 1 : 0);
    }
    if (data.isNew !== undefined) {
      fields.push("is_new = ?");
      values.push(data.isNew ? 1 : 0);
    }

    if (fields.length === 0) return null;

    values.push(id);

    return await this.db
      .prepare(`UPDATE services SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
  }

  async delete(id: number) {
    return await this.db
      .prepare("DELETE FROM services WHERE id = ?")
      .bind(id)
      .run();
  }
}
