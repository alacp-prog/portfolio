import type { Context } from "hono";
import { ServiceCategoryService } from "../services/serviceCategory.service";
import {
  validateCreateServiceCategory,
  validateUpdateServiceCategory,
} from "../validation/serviceCategory.validation";

type Bindings = {
  portfolio_db: D1Database;
};

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Error && /UNIQUE constraint failed/i.test(error.message);
}

export class ServiceCategoryController {
  static async list(c: Context<{ Bindings: Bindings }>) {
    const service = new ServiceCategoryService(c.env.portfolio_db);
    const categories = await service.getCategories();

    return c.json({
      success: true,
      data: categories,
    });
  }

  static async get(c: Context<{ Bindings: Bindings }>) {
    const id = c.req.param("id")!;
    const service = new ServiceCategoryService(c.env.portfolio_db);
    const item = await service.getCategory(id);

    if (!item) {
      return c.json(
        { success: false, message: "Category not found" },
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
    const validation = validateCreateServiceCategory(body);

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

    const service = new ServiceCategoryService(c.env.portfolio_db);

    try {
      const id = await service.createCategory(validation.parsed!);
      return c.json({ success: true, data: { id } }, 201);
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return c.json({ success: false, message: "Une catégorie avec ce slug existe déjà" }, 409);
      }
      throw error;
    }
  }

  static async update(c: Context<{ Bindings: Bindings }>) {
    const id = c.req.param("id")!;
    const body = await c.req.json();
    const validation = validateUpdateServiceCategory(body);

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

    const service = new ServiceCategoryService(c.env.portfolio_db);

    const existing = await service.getCategory(id);
    if (!existing) {
      return c.json(
        { success: false, message: "Category not found" },
        404
      );
    }

    try {
      await service.updateCategory(id, validation.parsed!);
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return c.json({ success: false, message: "Une catégorie avec ce slug existe déjà" }, 409);
      }
      throw error;
    }

    return c.json({ success: true, message: "Category updated" });
  }

  static async remove(c: Context<{ Bindings: Bindings }>) {
    const id = c.req.param("id")!;
    const service = new ServiceCategoryService(c.env.portfolio_db);

    const existing = await service.getCategory(id);
    if (!existing) {
      return c.json(
        { success: false, message: "Category not found" },
        404
      );
    }

    const linkedServices = await service.countLinkedServices(id);
    if (linkedServices > 0) {
      return c.json(
        {
          success: false,
          message: "Impossible de supprimer une catégorie encore utilisée par des services",
        },
        409
      );
    }

    await service.deleteCategory(id);

    return c.json({ success: true, message: "Category deleted" });
  }
}
