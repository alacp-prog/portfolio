export interface CreateContactInput {
  name: string;
  email: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (!input.message || typeof input.message !== "string") {
    errors.push("message is required and must be a string");
  } else if (input.message.trim().length < 10) {
    errors.push("message must be at least 10 characters");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    parsed: {
      name: (input.name as string).trim(),
      email: (input.email as string).trim(),
      message: (input.message as string).trim(),
    },
  };
}
