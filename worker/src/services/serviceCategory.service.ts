import { ServiceCategoryRepository } from "../repositories/serviceCategory.repository";

export class ServiceCategoryService {
  private repository: ServiceCategoryRepository;

  constructor(db: D1Database) {
    this.repository = new ServiceCategoryRepository(db);
  }

  async getCategories() {
    return await this.repository.findAll();
  }

  async getCategory(id: string) {
    return await this.repository.findById(id);
  }

  async countLinkedServices(id: string) {
    return await this.repository.countLinkedServices(id);
  }

  async createCategory(data: {
    name: string;
    slug: string;
    description?: string;
    isNew: boolean;
  }): Promise<string> {
    return await this.repository.create(data);
  }

  async updateCategory(
    id: string,
    data: {
      name?: string;
      slug?: string;
      description?: string;
      isNew?: boolean;
    }
  ) {
    return await this.repository.update(id, data);
  }

  async deleteCategory(id: string) {
    return await this.repository.delete(id);
  }
}
