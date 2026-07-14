import { SkillRepository } from "../repositories/skill.repository";

export class SkillService {
  private repository: SkillRepository;

  constructor(db: D1Database) {
    this.repository = new SkillRepository(db);
  }

  async getSkills() {
    return await this.repository.findAll();
  }

  async getSkill(id: number) {
    return await this.repository.findById(id);
  }

  async createSkill(data: { name: string; level?: number }) {
    return await this.repository.create(data);
  }

  async updateSkill(id: number, data: { name?: string; level?: number }) {
    return await this.repository.update(id, data);
  }

  async deleteSkill(id: number) {
    return await this.repository.delete(id);
  }
}
