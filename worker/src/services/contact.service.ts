import { ContactRepository } from "../repositories/contact.repository";

export class ContactService {
  private repository: ContactRepository;

  constructor(db: D1Database) {
    this.repository = new ContactRepository(db);
  }

  async getContacts() {
    return await this.repository.findAll();
  }

  async getContact(id: number) {
    return await this.repository.findById(id);
  }

  async createContact(data: {
    name: string;
    email: string;
    phone: string;
    category: string;
    service: string;
    solutions: string[];
    description?: string;
  }) {
    return await this.repository.create(data);
  }

  async validateCatalogSelection(data: { category: string; service: string; solutions: string[] }): Promise<string[]> {
    const { categoryValid, serviceValid, invalidSolutions } = await this.repository.resolveCatalogSelection(
      data.category,
      data.service,
      data.solutions
    );

    const errors: string[] = [];
    if (!categoryValid) {
      errors.push("category does not match an existing category");
    } else if (!serviceValid) {
      errors.push("service does not match an existing service in this category");
    } else if (invalidSolutions.length > 0) {
      errors.push(`solutions contain values not linked to this service: ${invalidSolutions.join(", ")}`);
    }

    return errors;
  }

  async updateContactStatus(id: number, status: "new" | "treated") {
    return await this.repository.updateStatus(id, status);
  }

  async deleteContact(id: number) {
    return await this.repository.delete(id);
  }
}
