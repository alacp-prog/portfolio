import { Hono } from "hono";
import { ContactController } from "../controllers/contact.controller";

type Bindings = {
  portfolio_db: D1Database;
};

const contactRoutes = new Hono<{ Bindings: Bindings }>();

contactRoutes.get("/", ContactController.list);
contactRoutes.get("/:id", ContactController.get);
contactRoutes.post("/", ContactController.create);
contactRoutes.delete("/:id", ContactController.remove);

export default contactRoutes;
