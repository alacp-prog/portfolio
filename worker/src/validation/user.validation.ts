export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
  password?: string;
}

export const VALID_ROLES = ["admin", "editor", "viewer"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCreateUser(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: CreateUserInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  if (!input.firstName || typeof input.firstName !== "string" || input.firstName.trim().length === 0) {
    errors.push("firstName is required and must be a non-empty string");
  }

  if (!input.lastName || typeof input.lastName !== "string" || input.lastName.trim().length === 0) {
    errors.push("lastName is required and must be a non-empty string");
  }

  if (!input.email || typeof input.email !== "string" || !EMAIL_RE.test(input.email.trim())) {
    errors.push("email is required and must be a valid email address");
  }

  if (!input.password || typeof input.password !== "string" || input.password.length < 8) {
    errors.push("password is required and must be at least 8 characters");
  }

  if (!input.role || typeof input.role !== "string" || !VALID_ROLES.includes(input.role)) {
    errors.push(`role is required and must be one of: ${VALID_ROLES.join(", ")}`);
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    parsed: {
      firstName: (input.firstName as string).trim(),
      lastName: (input.lastName as string).trim(),
      email: (input.email as string).trim().toLowerCase(),
      password: input.password as string,
      role: input.role as string,
    },
  };
}

export function validateUpdateUser(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: UpdateUserInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  const hasFields =
    input.firstName !== undefined ||
    input.lastName !== undefined ||
    input.email !== undefined ||
    input.role !== undefined ||
    input.isActive !== undefined ||
    input.password !== undefined;

  if (!hasFields) {
    return { valid: false, errors: ["At least one field is required for update"] };
  }

  if (input.firstName !== undefined && (typeof input.firstName !== "string" || input.firstName.trim().length === 0)) {
    errors.push("firstName must be a non-empty string");
  }

  if (input.lastName !== undefined && (typeof input.lastName !== "string" || input.lastName.trim().length === 0)) {
    errors.push("lastName must be a non-empty string");
  }

  if (input.email !== undefined && (typeof input.email !== "string" || !EMAIL_RE.test(input.email.trim()))) {
    errors.push("email must be a valid email address");
  }

  if (input.role !== undefined && (typeof input.role !== "string" || !VALID_ROLES.includes(input.role))) {
    errors.push(`role must be one of: ${VALID_ROLES.join(", ")}`);
  }

  if (input.isActive !== undefined && typeof input.isActive !== "boolean") {
    errors.push("isActive must be a boolean");
  }

  if (input.password !== undefined && (typeof input.password !== "string" || input.password.length < 8)) {
    errors.push("password must be at least 8 characters");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    parsed: {
      firstName: input.firstName !== undefined ? (input.firstName as string).trim() : undefined,
      lastName: input.lastName !== undefined ? (input.lastName as string).trim() : undefined,
      email: input.email !== undefined ? (input.email as string).trim().toLowerCase() : undefined,
      role: input.role as string | undefined,
      isActive: input.isActive as boolean | undefined,
      password: input.password as string | undefined,
    },
  };
}
