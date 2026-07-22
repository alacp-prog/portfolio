import type { Context } from "hono";
import { ContactService } from "../services/contact.service";
import { validateCreateContact } from "../validation/contact.validation";

type Bindings = {
  portfolio_db: D1Database;
  CONTACT_RATE_LIMITER: RateLimit;
};

export class ContactController {
  static async list(c: Context<{ Bindings: Bindings }>) {
    const service = new ContactService(c.env.portfolio_db);
    const contacts = await service.getContacts();

    return c.json({
      success: true,
      data: contacts,
    });
  }

  static async get(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const service = new ContactService(c.env.portfolio_db);
    const contact = await service.getContact(id);

    if (!contact) {
      return c.json(
        { success: false, message: "Contact not found" },
        404
      );
    }

    return c.json({
      success: true,
      data: contact,
    });
  }

  static async create(c: Context<{ Bindings: Bindings }>) {
    const ip = c.req.header("CF-Connecting-IP") ?? "unknown";
    const { success: withinLimit } = await c.env.CONTACT_RATE_LIMITER.limit({ key: ip });
    if (!withinLimit) {
      return c.json(
        { success: false, message: "Trop de messages envoyés. Réessayez plus tard." },
        429
      );
    }

    const body = await c.req.json();
    const validation = validateCreateContact(body);

    if (!validation.valid) {
      return c.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        400
      );
    }

    const service = new ContactService(c.env.portfolio_db);
    const result = await service.createContact(validation.parsed!);

    return c.json({ success: true, result }, 201);
  }

  static async remove(c: Context<{ Bindings: Bindings }>) {
    const id = Number(c.req.param("id"));
    const service = new ContactService(c.env.portfolio_db);

    const existing = await service.getContact(id);
    if (!existing) {
      return c.json(
        { success: false, message: "Contact not found" },
        404
      );
    }

    await service.deleteContact(id);

    return c.json({ success: true, message: "Contact deleted" });
  }
}
