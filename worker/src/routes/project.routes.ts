import { Hono } from "hono";
import { ProjectController } from "../controllers/project.controller";

type Bindings = {
  portfolio_db: D1Database;
};

const projectRoutes = new Hono<{ Bindings: Bindings }>();

projectRoutes.get("/", ProjectController.list);
projectRoutes.get("/:id", ProjectController.get);
projectRoutes.post("/", ProjectController.create);
projectRoutes.put("/:id", ProjectController.update);
projectRoutes.delete("/:id", ProjectController.remove);

export default projectRoutes;
