import { Hono } from "hono";
import { ServiceCategoryController } from "../controllers/serviceCategory.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
};

const serviceCategoryRoutes = new Hono<{ Bindings: Bindings }>();
const canEdit = requireRole("admin", "editor");

serviceCategoryRoutes.get("/", ServiceCategoryController.list);
serviceCategoryRoutes.get("/:id", ServiceCategoryController.get);
serviceCategoryRoutes.post("/", requireAuth, canEdit, ServiceCategoryController.create);
serviceCategoryRoutes.put("/:id", requireAuth, canEdit, ServiceCategoryController.update);
serviceCategoryRoutes.delete("/:id", requireAuth, canEdit, ServiceCategoryController.remove);

export default serviceCategoryRoutes;
