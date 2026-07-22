import { Hono } from "hono";
import { ContactController } from "../controllers/contact.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
  CONTACT_RATE_LIMITER: RateLimit;
};

const contactRoutes = new Hono<{ Bindings: Bindings }>();

// POST stays public: it's the public site's contact form submission endpoint.
contactRoutes.post("/", ContactController.create);

// Any authenticated role can read messages ("viewer" = consultation only).
contactRoutes.get("/", requireAuth, ContactController.list);
contactRoutes.get("/:id", requireAuth, ContactController.get);
contactRoutes.delete("/:id", requireAuth, requireRole("admin", "editor"), ContactController.remove);

export default contactRoutes;
