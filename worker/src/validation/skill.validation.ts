export interface CreateSkillInput {
  name: string;
  level?: number;
}

export interface UpdateSkillInput {
  name?: string;
  level?: number;
}

function isValidLevel(level: unknown): level is number {
  return typeof level === "number" && Number.isFinite(level) && level >= 0 && level <= 100;
}

export function validateCreateSkill(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: CreateSkillInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  if (!input.name || typeof input.name !== "string" || input.name.trim().length === 0) {
    errors.push("name is required and must be a non-empty string");
  }

  if (input.level !== undefined && input.level !== null) {
    if (!isValidLevel(input.level)) {
      errors.push("level must be a number between 0 and 100");
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    parsed: {
      name: (input.name as string).trim(),
      level: input.level !== undefined && input.level !== null ? (input.level as number) : undefined,
    },
  };
}

export function validateUpdateSkill(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: UpdateSkillInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  const hasFields = input.name !== undefined || input.level !== undefined;

  if (!hasFields) {
    return { valid: false, errors: ["At least one field is required for update"] };
  }

  if (input.name !== undefined) {
    if (typeof input.name !== "string" || input.name.trim().length === 0) {
      errors.push("name must be a non-empty string");
    }
  }

  if (input.level !== undefined && input.level !== null) {
    if (!isValidLevel(input.level)) {
      errors.push("level must be a number between 0 and 100");
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    parsed: {
      name: input.name ? (input.name as string).trim() : undefined,
      level: input.level !== undefined && input.level !== null ? (input.level as number) : undefined,
    },
  };
}
