import type { Context } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { UserService } from "../services/user.service";
import { signToken } from "../lib/jwt";
import { AUTH_COOKIE_NAME, type AuthUser } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
  AUTH_RATE_LIMITER: RateLimit;
};

type Variables = {
  user: AuthUser;
};

const SESSION_TTL_DEFAULT = 60 * 60 * 8; // 8h
const SESSION_TTL_REMEMBER = 60 * 60 * 24 * 30; // 30 days

export class AuthController {
  static async login(c: Context<{ Bindings: Bindings }>) {
    const ip = c.req.header("CF-Connecting-IP") ?? "unknown";
    const { success: withinLimit } = await c.env.AUTH_RATE_LIMITER.limit({ key: ip });
    if (!withinLimit) {
      return c.json(
        { success: false, message: "Trop de tentatives. Réessayez dans quelques instants." },
        429
      );
    }

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

    setCookie(c, AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      // The admin dashboard (*.pages.dev) and this API (*.workers.dev) are on different
      // registrable domains, so the cookie must be sent cross-site: SameSite=None is required
      // for it to be attached at all. CSRF exposure from this is mitigated by the strict
      // origin allowlist in the CORS config (see index.ts), which rejects the preflight for
      // any non-allowlisted origin before a state-changing request can be sent.
      sameSite: "None",
      path: "/",
      ...(remember ? { maxAge: ttl } : {}),
    });

    return c.json({
      success: true,
      data: {
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
    deleteCookie(c, AUTH_COOKIE_NAME, { path: "/" });
    return c.json({ success: true, message: "Déconnecté" });
  }
}
