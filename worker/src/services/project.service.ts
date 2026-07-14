import { ProjectRepository } from "../repositories/project.repository";

export class ProjectService {
  private repository: ProjectRepository;

  constructor(db: D1Database) {
    this.repository = new ProjectRepository(db);
  }

  async getProjects() {
    return await this.repository.findAll();
  }

  async getProject(id: number) {
    return await this.repository.findById(id);
  }

  async createProject(data: {
    title: string;
    description: string;
    image?: string;
    github_url?: string;
    demo_url?: string;
    category?: string;
    year?: number;
    stack?: string[];
  }) {
    return await this.repository.create(data);
  }

  async updateProject(
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
    return await this.repository.update(id, data);
  }

  async deleteProject(id: number) {
    return await this.repository.delete(id);
  }
}
