import { Hono } from "hono";
import { SkillController } from "../controllers/skill.controller";

type Bindings = {
  portfolio_db: D1Database;
};

const skillRoutes = new Hono<{ Bindings: Bindings }>();

skillRoutes.get("/", SkillController.list);
skillRoutes.get("/:id", SkillController.get);
skillRoutes.post("/", SkillController.create);
skillRoutes.put("/:id", SkillController.update);
skillRoutes.delete("/:id", SkillController.remove);

export default skillRoutes;
