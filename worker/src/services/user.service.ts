import { UserRepository } from "../repositories/user.repository";
import { hashPassword, verifyPassword } from "../lib/password";

export class UserService {
  private repository: UserRepository;

  constructor(db: D1Database) {
    this.repository = new UserRepository(db);
  }

  async getUsers() {
    return await this.repository.findAll();
  }

  async getUser(id: number) {
    return await this.repository.findById(id);
  }

  async createUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }) {
    const passwordHash = await hashPassword(data.password);
    return await this.repository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
      role: data.role,
    });
  }

  async updateUser(
    id: number,
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      role?: string;
      isActive?: boolean;
      password?: string;
    }
  ) {
    const passwordHash = data.password ? await hashPassword(data.password) : undefined;
    return await this.repository.update(id, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      isActive: data.isActive,
      passwordHash,
    });
  }

  async deleteUser(id: number) {
    return await this.repository.delete(id);
  }

  /** Returns the full user row (including password_hash) if credentials are valid and the account is active. */
  async verifyCredentials(email: string, password: string) {
    const user = await this.repository.findByEmail(email);
    if (!user || !user.is_active) return null;

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) return null;

    return user;
  }
}
