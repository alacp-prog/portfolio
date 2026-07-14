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

  async createContact(data: { name: string; email: string; message: string }) {
    return await this.repository.create(data);
  }

  async deleteContact(id: number) {
    return await this.repository.delete(id);
  }
}
