import type { Context } from "hono";
import { UserService } from "../services/user.service";
import { signToken } from "../lib/jwt";
import type { AuthUser } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
};

type Variables = {
  user: AuthUser;
};

const SESSION_TTL_DEFAULT = 60 * 60 * 8; // 8h
const SESSION_TTL_REMEMBER = 60 * 60 * 24 * 30; // 30 days

export class AuthController {
  static async login(c: Context<{ Bindings: Bindings }>) {
    const body = await c.req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    const remember = Boolean(body?.remember);

    if (!email || !password) {
      return c.json({ success: false, message: "Email et mot de passe requis" }, 400);
    }

    const service = new UserService(c.env.portfolio_db);
    const user = await service.verifyCredentials(email, password);

    if (!user) {
      return c.json({ success: false, message: "Email ou mot de passe incorrect" }, 401);
    }

    const ttl = remember ? SESSION_TTL_REMEMBER : SESSION_TTL_DEFAULT;
    const now = Math.floor(Date.now() / 1000);
    const token = await signToken(
      { sub: String(user.id), role: user.role, iat: now, exp: now + ttl },
      c.env.JWT_SECRET
    );

    return c.json({
      success: true,
      data: {
        token,
        expiresAt: (now + ttl) * 1000,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
        },
      },
    });
  }

  static async me(c: Context<{ Bindings: Bindings; Variables: Variables }>) {
    return c.json({ success: true, data: c.get("user") });
  }

  static async logout(c: Context) {
    return c.json({ success: true, message: "Déconnecté" });
  }
}
