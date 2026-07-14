export class ContactRepository {
  constructor(private db: D1Database) {}

  async findAll() {
    const { results } = await this.db
      .prepare("SELECT * FROM contacts ORDER BY created_at DESC")
      .all();

    return results;
  }

  async findById(id: number) {
    return await this.db
      .prepare("SELECT * FROM contacts WHERE id = ?")
      .bind(id)
      .first();
  }

  async create(data: { name: string; email: string; message: string }) {
    return await this.db
      .prepare(
        "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)"
      )
      .bind(data.name, data.email, data.message)
      .run();
  }

  async delete(id: number) {
    return await this.db
      .prepare("DELETE FROM contacts WHERE id = ?")
      .bind(id)
      .run();
  }
}
