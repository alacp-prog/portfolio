import type { Context } from "hono";
import { SolutionService } from "../services/solution.service";
import {
  validateCreateSolution,
  validateUpdateSolution,
} from "../validation/solution.validation";

type Bindings = {
  portfolio_db: D1Database;
};

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Error && /UNIQUE constraint failed/i.test(error.message);
}

export class SolutionController {
  static async list(c: Context<{ Bindings: Bindings }>) {
    const service = new SolutionService(c.env.portfolio_db);
    const solutions = await service.getSolutions();

    return c.json({
      success: true,
      data: solutions,
    });
  }

  static async get(c: Context<{ Bindings: Bindings }>) {
    const id = c.req.param("id")!;
    const service = new SolutionService(c.env.portfolio_db);
    const item = await service.getSolution(id);

    if (!item) {
      return c.json(
        { success: false, message: "Solution not found" },
        404
      );
    }

    return c.json({
      success: true,
      data: item,
    });
  }

  static async create(c: Context<{ Bindings: Bindings }>) {
    const body = await c.req.json();
    const validation = validateCreateSolution(body);

    if (!validation.valid) {
      return c.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        400
      );
    }

    const service = new SolutionService(c.env.portfolio_db);

    try {
      const id = await service.createSolution(validation.parsed!);
      return c.json({ success: true, data: { id } }, 201);
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return c.json({ success: false, message: "Une solution avec ce slug existe déjà" }, 409);
      }
      throw error;
    }
  }

  static async update(c: Context<{ Bindings: Bindings }>) {
    const id = c.req.param("id")!;
    const body = await c.req.json();
    const validation = validateUpdateSolution(body);

    if (!validation.valid) {
      return c.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        400
      );
    }

    const service = new SolutionService(c.env.portfolio_db);

    const existing = await service.getSolution(id);
    if (!existing) {
      return c.json(
        { success: false, message: "Solution not found" },
        404
      );
    }

    try {
      await service.updateSolution(id, validation.parsed!);
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return c.json({ success: false, message: "Une solution avec ce slug existe déjà" }, 409);
      }
      throw error;
    }

    return c.json({ success: true, message: "Solution updated" });
  }

  static async remove(c: Context<{ Bindings: Bindings }>) {
    const id = c.req.param("id")!;
    const service = new SolutionService(c.env.portfolio_db);

    const existing = await service.getSolution(id);
    if (!existing) {
      return c.json(
        { success: false, message: "Solution not found" },
        404
      );
    }

    await service.deleteSolution(id);

    return c.json({ success: true, message: "Solution deleted" });
  }
}
