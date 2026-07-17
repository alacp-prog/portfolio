import type { Context } from "hono";
import { UserService } from "../services/user.service";
import { validateCreateUser, validateUpdateUser } from "../validation/user.validation";
import type { AuthUser } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
};

type Variables = {
  user: AuthUser;
};

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Error && /UNIQUE constraint failed/i.test(error.message);
}

export class UserController {
  static async list(c: Context<{ Bindings: Bindings }>) {
    const service = new UserService(c.env.portfolio_db);
    const users = await service.getUsers();

    return c.json({ success: true, data: users });
  }

  static async get(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const service = new UserService(c.env.portfolio_db);
    const user = await service.getUser(id);

    if (!user) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    return c.json({ success: true, data: user });
  }

  static async create(c: Context<{ Bindings: Bindings }>) {
    const body = await c.req.json();
    const validation = validateCreateUser(body);

    if (!validation.valid) {
      return c.json(
        { success: false, message: "Validation failed", errors: validation.errors },
        400
      );
    }

    const service = new UserService(c.env.portfolio_db);

    try {
      const result = await service.createUser(validation.parsed!);
      return c.json({ success: true, result }, 201);
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return c.json({ success: false, message: "Un utilisateur avec cet email existe déjà" }, 409);
      }
      throw error;
    }
  }

  static async update(c: Context<{ Bindings: Bindings; Variables: Variables }>) {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    const validation = validateUpdateUser(body);

    if (!validation.valid) {
      return c.json(
        { success: false, message: "Validation failed", errors: validation.errors },
        400
      );
    }

    const currentUser = c.get("user");
    const parsed = validation.parsed!;
    const selfDemoting =
      currentUser.id === id && (parsed.isActive === false || (parsed.role && parsed.role !== "admin"));

    if (selfDemoting) {
      return c.json(
        { success: false, message: "Vous ne pouvez pas désactiver ou rétrograder votre propre compte" },
        400
      );
    }

    const service = new UserService(c.env.portfolio_db);
    const existing = await service.getUser(id);
    if (!existing) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    try {
      await service.updateUser(id, parsed);
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return c.json({ success: false, message: "Un utilisateur avec cet email existe déjà" }, 409);
      }
      throw error;
    }

    return c.json({ success: true, message: "User updated" });
  }

  static async remove(c: Context<{ Bindings: Bindings; Variables: Variables }>) {
    const id = Number(c.req.param("id"));
    const currentUser = c.get("user");

    if (currentUser.id === id) {
      return c.json({ success: false, message: "Vous ne pouvez pas supprimer votre propre compte" }, 400);
    }

    const service = new UserService(c.env.portfolio_db);
    const existing = await service.getUser(id);
    if (!existing) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    await service.deleteUser(id);

    return c.json({ success: true, message: "User deleted" });
  }
}
