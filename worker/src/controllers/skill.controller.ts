import type { Context } from "hono";
import { SkillService } from "../services/skill.service";
import {
  validateCreateSkill,
  validateUpdateSkill,
} from "../validation/skill.validation";

type Bindings = {
  portfolio_db: D1Database;
};

export class SkillController {
  static async list(c: Context<{ Bindings: Bindings }>) {
    const service = new SkillService(c.env.portfolio_db);
    const skills = await service.getSkills();

    return c.json({
      success: true,
      data: skills,
    });
  }

  static async get(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const service = new SkillService(c.env.portfolio_db);
    const skill = await service.getSkill(id);

    if (!skill) {
      return c.json(
        { success: false, message: "Skill not found" },
        404
      );
    }

    return c.json({
      success: true,
      data: skill,
    });
  }

  static async create(c: Context<{ Bindings: Bindings }>) {
    const body = await c.req.json();
    const validation = validateCreateSkill(body);

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

    const service = new SkillService(c.env.portfolio_db);
    const result = await service.createSkill(validation.parsed!);

    return c.json({ success: true, result }, 201);
  }

  static async update(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    const validation = validateUpdateSkill(body);

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

    const service = new SkillService(c.env.portfolio_db);

    const existing = await service.getSkill(id);
    if (!existing) {
      return c.json(
        { success: false, message: "Skill not found" },
        404
      );
    }

    await service.updateSkill(id, validation.parsed!);

    return c.json({ success: true, message: "Skill updated" });
  }

  static async remove(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const service = new SkillService(c.env.portfolio_db);

    const existing = await service.getSkill(id);
    if (!existing) {
      return c.json(
        { success: false, message: "Skill not found" },
        404
      );
    }

    await service.deleteSkill(id);

    return c.json({ success: true, message: "Skill deleted" });
  }
}
