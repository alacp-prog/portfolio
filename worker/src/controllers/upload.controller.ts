import type { Context } from "hono";
import { UploadService } from "../services/upload.service";

type Bindings = {
  portfolio_db: D1Database;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
};

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export class UploadController {
  static async upload(c: Context<{ Bindings: Bindings }>) {
    const body = await c.req.parseBody();

    const file = body["file"];
    if (!file || !(file instanceof File)) {
      return c.json(
        { success: false, message: "file is required" },
        400
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return c.json(
        {
          success: false,
          message: `file must be one of: ${ALLOWED_TYPES.join(", ")}`,
        },
        400
      );
    }

    if (file.size > MAX_SIZE) {
      return c.json(
        {
          success: false,
          message: "file size must be less than 5MB",
        },
        400
      );
    }

    const folder = (body["folder"] as string) || "portfolio";

    const service = new UploadService({
      CLOUDINARY_CLOUD_NAME: c.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: c.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: c.env.CLOUDINARY_API_SECRET,
    });

    try {
      const result = await service.uploadImage(file, folder);

      return c.json(
        {
          success: true,
          data: {
            url: result.url,
            publicId: result.publicId,
            width: result.width,
            height: result.height,
            format: result.format,
          },
        },
        201
      );
    } catch (error) {
      return c.json(
        {
          success: false,
          message: error instanceof Error ? error.message : "Upload failed",
        },
        500
      );
    }
  }

  static async delete(c: Context<{ Bindings: Bindings }>) {
    const body = await c.req.json();

    if (!body.publicId) {
      return c.json(
        { success: false, message: "publicId is required" },
        400
      );
    }

    const service = new UploadService({
      CLOUDINARY_CLOUD_NAME: c.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: c.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: c.env.CLOUDINARY_API_SECRET,
    });

    try {
      const deleted = await service.deleteImage(body.publicId);

      if (!deleted) {
        return c.json(
          { success: false, message: "Image not found" },
          404
        );
      }

      return c.json({
        success: true,
        message: "Image deleted",
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: error instanceof Error ? error.message : "Delete failed",
        },
        500
      );
    }
  }
}
