import { Hono } from "hono";
import { ServiceCategoryController } from "../controllers/serviceCategory.controller";
import { ServiceController } from "../controllers/service.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
};

const serviceCategoryRoutes = new Hono<{ Bindings: Bindings }>();
const canEdit = requireRole("admin", "editor");

serviceCategoryRoutes.get("/", ServiceCategoryController.list);
serviceCategoryRoutes.get("/:id", ServiceCategoryController.get);
// Public, minimal-field listing of the visible services for one category (by slug),
// used by the public site's category modal — never exposes internal ids.
serviceCategoryRoutes.get("/:slug/services", ServiceController.listByCategorySlug);
serviceCategoryRoutes.post("/", requireAuth, canEdit, ServiceCategoryController.create);
serviceCategoryRoutes.put("/:id", requireAuth, canEdit, ServiceCategoryController.update);
serviceCategoryRoutes.delete("/:id", requireAuth, canEdit, ServiceCategoryController.remove);

export default serviceCategoryRoutes;
