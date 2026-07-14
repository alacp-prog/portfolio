import { Hono } from "hono";
import { UploadController } from "../controllers/upload.controller";

type Bindings = {
  portfolio_db: D1Database;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
};

const uploadRoutes = new Hono<{ Bindings: Bindings }>();

uploadRoutes.post("/", UploadController.upload);
uploadRoutes.delete("/", UploadController.delete);

export default uploadRoutes;
