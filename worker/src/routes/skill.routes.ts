import { Hono } from "hono";
import { SkillController } from "../controllers/skill.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
};

const skillRoutes = new Hono<{ Bindings: Bindings }>();
const canEdit = requireRole("admin", "editor");

skillRoutes.get("/", SkillController.list);
skillRoutes.get("/:id", SkillController.get);
skillRoutes.post("/", requireAuth, canEdit, SkillController.create);
skillRoutes.put("/:id", requireAuth, canEdit, SkillController.update);
skillRoutes.delete("/:id", requireAuth, canEdit, SkillController.remove);

export default skillRoutes;
