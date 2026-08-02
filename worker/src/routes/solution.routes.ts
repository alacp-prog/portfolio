import { Hono } from "hono";
import { SolutionController } from "../controllers/solution.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
};

const solutionRoutes = new Hono<{ Bindings: Bindings }>();
const canEdit = requireRole("admin", "editor");

solutionRoutes.get("/", SolutionController.list);
solutionRoutes.get("/:id", SolutionController.get);
solutionRoutes.post("/", requireAuth, canEdit, SolutionController.create);
solutionRoutes.put("/:id", requireAuth, canEdit, SolutionController.update);
solutionRoutes.delete("/:id", requireAuth, canEdit, SolutionController.remove);

export default solutionRoutes;
