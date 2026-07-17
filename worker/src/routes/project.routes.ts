import { Hono } from "hono";
import { ProjectController } from "../controllers/project.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
};

const projectRoutes = new Hono<{ Bindings: Bindings }>();
const canEdit = requireRole("admin", "editor");

projectRoutes.get("/", ProjectController.list);
projectRoutes.get("/:id", ProjectController.get);
projectRoutes.post("/", requireAuth, canEdit, ProjectController.create);
projectRoutes.put("/:id", requireAuth, canEdit, ProjectController.update);
projectRoutes.delete("/:id", requireAuth, canEdit, ProjectController.remove);

export default projectRoutes;
