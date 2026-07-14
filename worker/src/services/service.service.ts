import { ServiceRepository } from "../repositories/service.repository";

export class ServiceService {
  private repository: ServiceRepository;

  constructor(db: D1Database) {
    this.repository = new ServiceRepository(db);
  }

  async getServices() {
    return await this.repository.findAll();
  }

  async getService(id: number) {
    return await this.repository.findById(id);
  }

  async createService(data: {
    title: string;
    description: string;
    icon?: string;
  }) {
    return await this.repository.create(data);
  }

  async updateService(
    id: number,
    data: { title?: string; description?: string; icon?: string }
  ) {
    return await this.repository.update(id, data);
  }

  async deleteService(id: number) {
    return await this.repository.delete(id);
  }
}
