import { Hono } from "hono";
import { ServiceSolutionController } from "../controllers/serviceSolution.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
};

const serviceSolutionRoutes = new Hono<{ Bindings: Bindings }>();
const canEdit = requireRole("admin", "editor");

serviceSolutionRoutes.get("/", ServiceSolutionController.list);
serviceSolutionRoutes.get("/:id", ServiceSolutionController.get);
serviceSolutionRoutes.post("/", requireAuth, canEdit, ServiceSolutionController.create);
serviceSolutionRoutes.put("/:id", requireAuth, canEdit, ServiceSolutionController.update);
serviceSolutionRoutes.delete("/:id", requireAuth, canEdit, ServiceSolutionController.remove);

export default serviceSolutionRoutes;
