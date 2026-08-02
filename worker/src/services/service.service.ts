import { ServiceRepository } from "../repositories/service.repository";

export class ServiceService {
  private repository: ServiceRepository;

  constructor(db: D1Database) {
    this.repository = new ServiceRepository(db);
  }

  async getServices() {
    return await this.repository.findAll();
  }

  async getService(id: string) {
    return await this.repository.findById(id);
  }

  async getPublicServicesByCategorySlug(categorySlug: string) {
    return await this.repository.findPublicByCategorySlug(categorySlug);
  }

  async createService(data: {
    categoryId: string;
    name: string;
    slug: string;
    problems: string[];
    description?: string;
    image?: string;
    isNew: boolean;
    visible: boolean;
  }): Promise<string> {
    return await this.repository.create(data);
  }

  async updateService(
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
    return await this.repository.update(id, data);
  }

  async deleteService(id: string) {
    return await this.repository.delete(id);
  }
}
