import { Hono } from "hono";
import { UploadController } from "../controllers/upload.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

type Bindings = {
  portfolio_db: D1Database;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  JWT_SECRET: string;
};

const uploadRoutes = new Hono<{ Bindings: Bindings }>();
const canEdit = requireRole("admin", "editor");

uploadRoutes.post("/", requireAuth, canEdit, UploadController.upload);
uploadRoutes.delete("/", requireAuth, canEdit, UploadController.delete);

export default uploadRoutes;
