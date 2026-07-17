import { Hono } from "hono";
import { UserController } from "../controllers/user.controller";
import { requireAuth, requireRole, type AuthUser } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
};

type Variables = {
  user: AuthUser;
};

const userRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>();

userRoutes.use("*", requireAuth, requireRole("admin"));

userRoutes.get("/", UserController.list);
userRoutes.get("/:id", UserController.get);
userRoutes.post("/", UserController.create);
userRoutes.put("/:id", UserController.update);
userRoutes.delete("/:id", UserController.remove);

export default userRoutes;
