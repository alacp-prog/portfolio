import { ServiceSolutionRepository } from "../repositories/serviceSolution.repository";

export class ServiceSolutionService {
  private repository: ServiceSolutionRepository;

  constructor(db: D1Database) {
    this.repository = new ServiceSolutionRepository(db);
  }

  async getServiceSolutions() {
    return await this.repository.findAll();
  }

  async getServiceSolution(id: string) {
    return await this.repository.findById(id);
  }

  async getPublicSolutionsByServiceSlug(serviceSlug: string) {
    return await this.repository.findPublicByServiceSlug(serviceSlug);
  }

  async createServiceSolution(data: {
    serviceId: string;
    solutionId: string;
    description?: string;
    isRecommended: boolean;
  }): Promise<string> {
    return await this.repository.create(data);
  }

  async updateServiceSolution(
    id: string,
    data: {
      serviceId?: string;
      solutionId?: string;
      description?: string;
      isRecommended?: boolean;
    }
  ) {
    return await this.repository.update(id, data);
  }

  async deleteServiceSolution(id: string) {
    return await this.repository.delete(id);
  }
}
