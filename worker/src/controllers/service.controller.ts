import type { Context } from "hono";
import { ServiceService } from "../services/service.service";
import {
  validateCreateService,
  validateUpdateService,
} from "../validation/service.validation";

type Bindings = {
  portfolio_db: D1Database;
};

export class ServiceController {
  static async list(c: Context<{ Bindings: Bindings }>) {
    const service = new ServiceService(c.env.portfolio_db);
    const services = await service.getServices();

    return c.json({
      success: true,
      data: services,
    });
  }

  static async get(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const service = new ServiceService(c.env.portfolio_db);
    const item = await service.getService(id);

    if (!item) {
      return c.json(
        { success: false, message: "Service not found" },
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
    const validation = validateCreateService(body);

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

    const service = new ServiceService(c.env.portfolio_db);
    const result = await service.createService(validation.parsed!);

    return c.json({ success: true, result }, 201);
  }

  static async update(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    const validation = validateUpdateService(body);

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

    const service = new ServiceService(c.env.portfolio_db);

    const existing = await service.getService(id);
    if (!existing) {
      return c.json(
        { success: false, message: "Service not found" },
        404
      );
    }

    await service.updateService(id, validation.parsed!);

    return c.json({ success: true, message: "Service updated" });
  }

  static async remove(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const service = new ServiceService(c.env.portfolio_db);

    const existing = await service.getService(id);
    if (!existing) {
      return c.json(
        { success: false, message: "Service not found" },
        404
      );
    }

    await service.deleteService(id);

    return c.json({ success: true, message: "Service deleted" });
  }
}
