interface ProjectRow {
  id: number;
  title: string;
  description: string;
  image: string | null;
  github_url: string | null;
  demo_url: string | null;
  category: string | null;
  year: number | null;
  stack: string | null;
  created_at: string;
}

function parseRow(row: ProjectRow) {
  return {
    ...row,
    stack: row.stack ? (JSON.parse(row.stack) as string[]) : [],
  };
}

export class ProjectRepository {
  constructor(private db: D1Database) {}

  async findAll() {
    const { results } = await this.db
      .prepare(
        "SELECT * FROM projects ORDER BY created_at DESC"
      )
      .all<ProjectRow>();

    return results.map(parseRow);
  }

  async findById(id: number) {
    const row = await this.db
      .prepare(
        "SELECT * FROM projects WHERE id = ?"
      )
      .bind(id)
      .first<ProjectRow>();

    return row ? parseRow(row) : null;
  }

  async create(data: {
    title: string;
    description: string;
    image?: string;
    github_url?: string;
    demo_url?: string;
    category?: string;
    year?: number;
    stack?: string[];
  }) {
    return await this.db
      .prepare(
        "INSERT INTO projects (title, description, image, github_url, demo_url, category, year, stack) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        data.title,
        data.description,
        data.image ?? null,
        data.github_url ?? null,
        data.demo_url ?? null,
        data.category ?? null,
        data.year ?? null,
        data.stack ? JSON.stringify(data.stack) : null
      )
      .run();
  }

  async update(
    id: number,
    data: {
      title?: string;
      description?: string;
      image?: string;
      github_url?: string;
      demo_url?: string;
      category?: string;
      year?: number;
      stack?: string[];
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
    if (data.image !== undefined) {
      fields.push("image = ?");
      values.push(data.image);
    }
    if (data.github_url !== undefined) {
      fields.push("github_url = ?");
      values.push(data.github_url);
    }
    if (data.demo_url !== undefined) {
      fields.push("demo_url = ?");
      values.push(data.demo_url);
    }
    if (data.category !== undefined) {
      fields.push("category = ?");
      values.push(data.category);
    }
    if (data.year !== undefined) {
      fields.push("year = ?");
      values.push(data.year);
    }
    if (data.stack !== undefined) {
      fields.push("stack = ?");
      values.push(JSON.stringify(data.stack));
    }

    if (fields.length === 0) return null;

    values.push(id);

    return await this.db
      .prepare(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
  }

  async delete(id: number) {
    return await this.db
      .prepare("DELETE FROM projects WHERE id = ?")
      .bind(id)
      .run();
  }
}
