import type { Context, Next } from "hono";
import { verifyToken } from "../lib/jwt";

export type AuthUser = {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
};

type Bindings = {
  portfolio_db: D1Database;
  JWT_SECRET: string;
};

type Variables = {
  user: AuthUser;
};

export async function requireAuth(c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) {
  const authHeader = c.req.header("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;

  if (!token) {
    return c.json({ success: false, message: "Authentification requise" }, 401);
  }

  const payload = await verifyToken(token, c.env.JWT_SECRET);
  if (!payload) {
    return c.json({ success: false, message: "Session invalide ou expirée" }, 401);
  }

  const userId = Number(payload.sub);
  const row = await c.env.portfolio_db
    .prepare("SELECT id, first_name, last_name, email, role, is_active FROM users WHERE id = ?")
    .bind(userId)
    .first<{
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      is_active: number;
    }>();

  if (!row || !row.is_active) {
    return c.json({ success: false, message: "Compte introuvable ou désactivé" }, 401);
  }

  c.set("user", {
    id: row.id,
    email: row.email,
    role: row.role,
    firstName: row.first_name,
    lastName: row.last_name,
  });

  await next();
}

export function requireRole(...roles: string[]) {
  return async function roleGuard(c: Context<{ Variables: Variables }>, next: Next) {
    const user = c.get("user");
    if (!user || !roles.includes(user.role)) {
      return c.json({ success: false, message: "Accès refusé" }, 403);
    }
    await next();
  };
}
