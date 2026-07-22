import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller";
import { requireAuth, type AuthUser } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
  AUTH_RATE_LIMITER: RateLimit;
};

type Variables = {
  user: AuthUser;
};

const authRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/logout", AuthController.logout);
authRoutes.get("/me", requireAuth, AuthController.me);

export default authRoutes;
