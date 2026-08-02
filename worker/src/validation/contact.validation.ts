export interface CreateContactInput {
  name: string;
  email: string;
  phone: string;
  category: string;
  service: string;
  solutions: string[];
  description?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+()\-.\s]{6,20}$/;

export function validateCreateContact(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: CreateContactInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  if (!input.name || typeof input.name !== "string" || input.name.trim().length === 0) {
    errors.push("name is required and must be a non-empty string");
  }

  if (!input.email || typeof input.email !== "string") {
    errors.push("email is required and must be a string");
  } else if (!EMAIL_REGEX.test(input.email)) {
    errors.push("email must be a valid email address");
  }

  if (!input.phone || typeof input.phone !== "string" || input.phone.trim().length === 0) {
    errors.push("phone is required and must be a non-empty string");
  } else if (!PHONE_REGEX.test(input.phone.trim())) {
    errors.push("phone must be a valid phone number");
  }

  if (!input.category || typeof input.category !== "string" || input.category.trim().length === 0) {
    errors.push("category is required and must be a non-empty string");
  }

  if (!input.service || typeof input.service !== "string" || input.service.trim().length === 0) {
    errors.push("service is required and must be a non-empty string");
  }

  if (
    !Array.isArray(input.solutions) ||
    input.solutions.length === 0 ||
    !input.solutions.every((s) => typeof s === "string" && s.trim().length > 0)
  ) {
    errors.push("solutions is required and must be a non-empty array of strings");
  }

  if (input.description !== undefined && input.description !== null && typeof input.description !== "string") {
    errors.push("description must be a string");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  const description = typeof input.description === "string" ? input.description.trim() : "";

  return {
    valid: true,
    errors: [],
    parsed: {
      name: (input.name as string).trim(),
      email: (input.email as string).trim(),
      phone: (input.phone as string).trim(),
      category: (input.category as string).trim(),
      service: (input.service as string).trim(),
      solutions: (input.solutions as string[]).map((s) => s.trim()),
      description: description.length > 0 ? description : undefined,
    },
  };
}
