import type { Context } from "hono";
import { ProjectService } from "../services/project.service";
import {
  validateCreateProject,
  validateUpdateProject,
} from "../validation/project.validation";

type Bindings = {
  portfolio_db: D1Database;
};

export class ProjectController {
  static async list(c: Context<{ Bindings: Bindings }>) {
    const service = new ProjectService(c.env.portfolio_db);
    const projects = await service.getProjects();

    return c.json({
      success: true,
      data: projects,
    });
  }

  static async get(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const service = new ProjectService(c.env.portfolio_db);
    const project = await service.getProject(id);

    if (!project) {
      return c.json(
        {
          success: false,
          message: "Project not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: project,
    });
  }

  static async create(c: Context<{ Bindings: Bindings }>) {
    const body = await c.req.json();
    const validation = validateCreateProject(body);

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

    const service = new ProjectService(c.env.portfolio_db);
    const result = await service.createProject(validation.parsed!);

    return c.json(
      {
        success: true,
        result,
      },
      201
    );
  }

  static async update(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    const validation = validateUpdateProject(body);

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

    const service = new ProjectService(c.env.portfolio_db);

    const existing = await service.getProject(id);
    if (!existing) {
      return c.json(
        {
          success: false,
          message: "Project not found",
        },
        404
      );
    }

    await service.updateProject(id, validation.parsed!);

    return c.json({
      success: true,
      message: "Project updated",
    });
  }

  static async remove(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const service = new ProjectService(c.env.portfolio_db);

    const existing = await service.getProject(id);
    if (!existing) {
      return c.json(
        {
          success: false,
          message: "Project not found",
        },
        404
      );
    }

    await service.deleteProject(id);

    return c.json({
      success: true,
      message: "Project deleted",
    });
  }
}
