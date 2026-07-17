export interface UserRow {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  role: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

const PUBLIC_COLUMNS =
  "id, first_name, last_name, email, role, is_active, created_at, updated_at";

export class UserRepository {
  constructor(private db: D1Database) {}

  async findAll() {
    const { results } = await this.db
      .prepare(`SELECT ${PUBLIC_COLUMNS} FROM users ORDER BY created_at DESC`)
      .all();

    return results;
  }

  async findById(id: number) {
    return await this.db
      .prepare(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = ?`)
      .bind(id)
      .first();
  }

  async findByEmail(email: string) {
    return await this.db
      .prepare("SELECT * FROM users WHERE email = ?")
      .bind(email)
      .first<UserRow>();
  }

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: string;
  }) {
    return await this.db
      .prepare(
        "INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)"
      )
      .bind(data.firstName, data.lastName, data.email, data.passwordHash, data.role)
      .run();
  }

  async update(
    id: number,
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      role?: string;
      isActive?: boolean;
      passwordHash?: string;
    }
  ) {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.firstName !== undefined) {
      fields.push("first_name = ?");
      values.push(data.firstName);
    }
    if (data.lastName !== undefined) {
      fields.push("last_name = ?");
      values.push(data.lastName);
    }
    if (data.email !== undefined) {
      fields.push("email = ?");
      values.push(data.email);
    }
    if (data.role !== undefined) {
      fields.push("role = ?");
      values.push(data.role);
    }
    if (data.isActive !== undefined) {
      fields.push("is_active = ?");
      values.push(data.isActive ? 1 : 0);
    }
    if (data.passwordHash !== undefined) {
      fields.push("password_hash = ?");
      values.push(data.passwordHash);
    }

    if (fields.length === 0) return null;

    fields.push("updated_at = datetime('now')");
    values.push(id);

    return await this.db
      .prepare(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
  }

  async delete(id: number) {
    return await this.db.prepare("DELETE FROM users WHERE id = ?").bind(id).run();
  }
}
