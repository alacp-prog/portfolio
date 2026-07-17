import { Hono } from "hono";
import { ServiceController } from "../controllers/service.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
};

const serviceRoutes = new Hono<{ Bindings: Bindings }>();
const canEdit = requireRole("admin", "editor");

serviceRoutes.get("/", ServiceController.list);
serviceRoutes.get("/:id", ServiceController.get);
serviceRoutes.post("/", requireAuth, canEdit, ServiceController.create);
serviceRoutes.put("/:id", requireAuth, canEdit, ServiceController.update);
serviceRoutes.delete("/:id", requireAuth, canEdit, ServiceController.remove);

export default serviceRoutes;
