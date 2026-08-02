import type { Context } from "hono";
import { ServiceSolutionService } from "../services/serviceSolution.service";
import {
  validateCreateServiceSolution,
  validateUpdateServiceSolution,
} from "../validation/serviceSolution.validation";

type Bindings = {
  portfolio_db: D1Database;
};

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Error && /UNIQUE constraint failed/i.test(error.message);
}

export class ServiceSolutionController {
  static async list(c: Context<{ Bindings: Bindings }>) {
    const service = new ServiceSolutionService(c.env.portfolio_db);
    const relations = await service.getServiceSolutions();

    return c.json({
      success: true,
      data: relations,
    });
  }

  static async get(c: Context<{ Bindings: Bindings }>) {
    const id = c.req.param("id")!;
    const service = new ServiceSolutionService(c.env.portfolio_db);
    const item = await service.getServiceSolution(id);

    if (!item) {
      return c.json(
        { success: false, message: "Relation not found" },
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
    const validation = validateCreateServiceSolution(body);

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

    const service = new ServiceSolutionService(c.env.portfolio_db);

    try {
      const id = await service.createServiceSolution(validation.parsed!);
      return c.json({ success: true, data: { id } }, 201);
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return c.json(
          { success: false, message: "Cette solution est déjà associée à ce service" },
          409
        );
      }
      throw error;
    }
  }

  static async update(c: Context<{ Bindings: Bindings }>) {
    const id = c.req.param("id")!;
    const body = await c.req.json();
    const validation = validateUpdateServiceSolution(body);

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

    const service = new ServiceSolutionService(c.env.portfolio_db);

    const existing = await service.getServiceSolution(id);
    if (!existing) {
      return c.json(
        { success: false, message: "Relation not found" },
        404
      );
    }

    try {
      await service.updateServiceSolution(id, validation.parsed!);
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return c.json(
          { success: false, message: "Cette solution est déjà associée à ce service" },
          409
        );
      }
      throw error;
    }

    return c.json({ success: true, message: "Relation updated" });
  }

  static async remove(c: Context<{ Bindings: Bindings }>) {
    const id = c.req.param("id")!;
    const service = new ServiceSolutionService(c.env.portfolio_db);

    const existing = await service.getServiceSolution(id);
    if (!existing) {
      return c.json(
        { success: false, message: "Relation not found" },
        404
      );
    }

    await service.deleteServiceSolution(id);

    return c.json({ success: true, message: "Relation deleted" });
  }
}
