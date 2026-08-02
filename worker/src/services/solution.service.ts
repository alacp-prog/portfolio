import { SolutionRepository } from "../repositories/solution.repository";

export class SolutionService {
  private repository: SolutionRepository;

  constructor(db: D1Database) {
    this.repository = new SolutionRepository(db);
  }

  async getSolutions() {
    return await this.repository.findAll();
  }

  async getSolution(id: string) {
    return await this.repository.findById(id);
  }

  async createSolution(data: {
    name: string;
    slug: string;
    description?: string;
    priceType: "fixed" | "quote";
    price?: number;
    duration?: string;
    image?: string;
    isNew: boolean;
  }): Promise<string> {
    return await this.repository.create(data);
  }

  async updateSolution(
    id: string,
    data: {
      name?: string;
      slug?: string;
      description?: string;
      priceType?: "fixed" | "quote";
      price?: number | null;
      duration?: string;
      image?: string;
      isNew?: boolean;
    }
  ) {
    return await this.repository.update(id, data);
  }

  async deleteSolution(id: string) {
    return await this.repository.delete(id);
  }
}
