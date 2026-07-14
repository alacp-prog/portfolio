export interface CreateServiceInput {
  title: string;
  description: string;
  icon?: string;
}

export interface UpdateServiceInput {
  title?: string;
  description?: string;
  icon?: string;
}

export function validateCreateService(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: CreateServiceInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  if (!input.title || typeof input.title !== "string" || input.title.trim().length === 0) {
    errors.push("title is required and must be a non-empty string");
  }

  if (!input.description || typeof input.description !== "string" || input.description.trim().length === 0) {
    errors.push("description is required and must be a non-empty string");
  }

  if (input.icon !== undefined && input.icon !== null) {
    if (typeof input.icon !== "string" || input.icon.trim().length === 0) {
      errors.push("icon must be a non-empty string");
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    parsed: {
      title: (input.title as string).trim(),
      description: (input.description as string).trim(),
      icon: input.icon ? (input.icon as string).trim() : undefined,
    },
  };
}

export function validateUpdateService(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: UpdateServiceInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  const hasFields =
    input.title !== undefined || input.description !== undefined || input.icon !== undefined;

  if (!hasFields) {
    return { valid: false, errors: ["At least one field is required for update"] };
  }

  if (input.title !== undefined) {
    if (typeof input.title !== "string" || input.title.trim().length === 0) {
      errors.push("title must be a non-empty string");
    }
  }

  if (input.description !== undefined) {
    if (typeof input.description !== "string" || input.description.trim().length === 0) {
      errors.push("description must be a non-empty string");
    }
  }

  if (input.icon !== undefined && input.icon !== null) {
    if (typeof input.icon !== "string" || input.icon.trim().length === 0) {
      errors.push("icon must be a non-empty string");
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    parsed: {
      title: input.title ? (input.title as string).trim() : undefined,
      description: input.description ? (input.description as string).trim() : undefined,
      icon: input.icon ? (input.icon as string).trim() : undefined,
    },
  };
}
