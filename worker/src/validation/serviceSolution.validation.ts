export interface CreateServiceSolutionInput {
  serviceId: string;
  solutionId: string;
  description?: string;
  isRecommended: boolean;
}

export interface UpdateServiceSolutionInput {
  serviceId?: string;
  solutionId?: string;
  description?: string;
  isRecommended?: boolean;
}

export function validateCreateServiceSolution(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: CreateServiceSolutionInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  if (!input.serviceId || typeof input.serviceId !== "string" || input.serviceId.trim().length === 0) {
    errors.push("serviceId is required and must be a non-empty string");
  }

  if (!input.solutionId || typeof input.solutionId !== "string" || input.solutionId.trim().length === 0) {
    errors.push("solutionId is required and must be a non-empty string");
  }

  if (input.description !== undefined && input.description !== null) {
    if (typeof input.description !== "string") {
      errors.push("description must be a string");
    }
  }

  if (input.isRecommended !== undefined && typeof input.isRecommended !== "boolean") {
    errors.push("isRecommended must be a boolean");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    parsed: {
      serviceId: (input.serviceId as string).trim(),
      solutionId: (input.solutionId as string).trim(),
      description: input.description ? (input.description as string).trim() : undefined,
      isRecommended: typeof input.isRecommended === "boolean" ? input.isRecommended : false,
    },
  };
}

export function validateUpdateServiceSolution(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: UpdateServiceSolutionInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  const hasFields =
    input.serviceId !== undefined ||
    input.solutionId !== undefined ||
    input.description !== undefined ||
    input.isRecommended !== undefined;

  if (!hasFields) {
    return { valid: false, errors: ["At least one field is required for update"] };
  }

  if (input.serviceId !== undefined) {
    if (typeof input.serviceId !== "string" || input.serviceId.trim().length === 0) {
      errors.push("serviceId must be a non-empty string");
    }
  }

  if (input.solutionId !== undefined) {
    if (typeof input.solutionId !== "string" || input.solutionId.trim().length === 0) {
      errors.push("solutionId must be a non-empty string");
    }
  }

  if (input.description !== undefined && input.description !== null) {
    if (typeof input.description !== "string") {
      errors.push("description must be a string");
    }
  }

  if (input.isRecommended !== undefined && typeof input.isRecommended !== "boolean") {
    errors.push("isRecommended must be a boolean");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    parsed: {
      serviceId: input.serviceId ? (input.serviceId as string).trim() : undefined,
      solutionId: input.solutionId ? (input.solutionId as string).trim() : undefined,
      description: input.description ? (input.description as string).trim() : undefined,
      isRecommended: typeof input.isRecommended === "boolean" ? input.isRecommended : undefined,
    },
  };
}
