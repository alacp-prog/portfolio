import { Hono } from "hono";
import { ServiceController } from "../controllers/service.controller";

type Bindings = {
  portfolio_db: D1Database;
};

const serviceRoutes = new Hono<{ Bindings: Bindings }>();

serviceRoutes.get("/", ServiceController.list);
serviceRoutes.get("/:id", ServiceController.get);
serviceRoutes.post("/", ServiceController.create);
serviceRoutes.put("/:id", ServiceController.update);
serviceRoutes.delete("/:id", ServiceController.remove);

export default serviceRoutes;
