import { Hono } from "hono";
import { cors } from "hono/cors";
import projectRoutes from "./routes/project.routes";
import serviceRoutes from "./routes/service.routes";
import skillRoutes from "./routes/skill.routes";
import contactRoutes from "./routes/contact.routes";
import uploadRoutes from "./routes/upload.routes";

type Bindings = {
  portfolio_db: D1Database;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/,
  /^https:\/\/([a-z0-9-]+\.)?portfolio-frontend-f2h\.pages\.dev$/,
];

app.use(
  "*",
  cors({
    origin: (origin) =>
      ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin)) ? origin : null,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.get("/", async (c) => {
  const result = await c.env.portfolio_db
    .prepare("SELECT 1 AS test")
    .first();

  return c.json({
    success: true,
    database: result,
  });
});

app.route("/projects", projectRoutes);
app.route("/services", serviceRoutes);
app.route("/skills", skillRoutes);
app.route("/contacts", contactRoutes);
app.route("/upload", uploadRoutes);

export default app;
