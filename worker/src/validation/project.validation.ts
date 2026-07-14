export interface CreateProjectInput {
  title: string;
  description: string;
  image?: string;
  github_url?: string;
  demo_url?: string;
  category?: string;
  year?: number;
  stack?: string[];
}

export interface UpdateProjectInput {
  title?: string;
  description?: string;
  image?: string;
  github_url?: string;
  demo_url?: string;
  category?: string;
  year?: number;
  stack?: string[];
}

function isValidYear(year: unknown): year is number {
  return typeof year === "number" && Number.isInteger(year) && year >= 2000 && year <= 2100;
}

function isValidStack(stack: unknown): stack is string[] {
  return Array.isArray(stack) && stack.every((s) => typeof s === "string" && s.trim().length > 0);
}

const URL_REGEX = /^https?:\/\/.+/;

function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url);
}

export function validateCreateProject(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: CreateProjectInput;
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

  if (input.image !== undefined && input.image !== null) {
    if (typeof input.image !== "string" || !isValidUrl(input.image)) {
      errors.push("image must be a valid URL");
    }
  }

  if (input.github_url !== undefined && input.github_url !== null) {
    if (typeof input.github_url !== "string" || !isValidUrl(input.github_url)) {
      errors.push("github_url must be a valid URL");
    }
  }

  if (input.demo_url !== undefined && input.demo_url !== null) {
    if (typeof input.demo_url !== "string" || !isValidUrl(input.demo_url)) {
      errors.push("demo_url must be a valid URL");
    }
  }

  if (input.category !== undefined && input.category !== null) {
    if (typeof input.category !== "string" || input.category.trim().length === 0) {
      errors.push("category must be a non-empty string");
    }
  }

  if (input.year !== undefined && input.year !== null) {
    if (!isValidYear(input.year)) {
      errors.push("year must be an integer between 2000 and 2100");
    }
  }

  if (input.stack !== undefined && input.stack !== null) {
    if (!isValidStack(input.stack)) {
      errors.push("stack must be an array of non-empty strings");
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
      image: input.image ? (input.image as string).trim() : undefined,
      github_url: input.github_url ? (input.github_url as string).trim() : undefined,
      demo_url: input.demo_url ? (input.demo_url as string).trim() : undefined,
      category: input.category ? (input.category as string).trim() : undefined,
      year: input.year !== undefined && input.year !== null ? (input.year as number) : undefined,
      stack: input.stack ? (input.stack as string[]) : undefined,
    },
  };
}

export function validateUpdateProject(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: UpdateProjectInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  const hasFields =
    input.title !== undefined ||
    input.description !== undefined ||
    input.image !== undefined ||
    input.github_url !== undefined ||
    input.demo_url !== undefined ||
    input.category !== undefined ||
    input.year !== undefined ||
    input.stack !== undefined;

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

  if (input.image !== undefined && input.image !== null) {
    if (typeof input.image !== "string" || !isValidUrl(input.image)) {
      errors.push("image must be a valid URL");
    }
  }

  if (input.github_url !== undefined && input.github_url !== null) {
    if (typeof input.github_url !== "string" || !isValidUrl(input.github_url)) {
      errors.push("github_url must be a valid URL");
    }
  }

  if (input.demo_url !== undefined && input.demo_url !== null) {
    if (typeof input.demo_url !== "string" || !isValidUrl(input.demo_url)) {
      errors.push("demo_url must be a valid URL");
    }
  }

  if (input.category !== undefined && input.category !== null) {
    if (typeof input.category !== "string" || input.category.trim().length === 0) {
      errors.push("category must be a non-empty string");
    }
  }

  if (input.year !== undefined && input.year !== null) {
    if (!isValidYear(input.year)) {
      errors.push("year must be an integer between 2000 and 2100");
    }
  }

  if (input.stack !== undefined && input.stack !== null) {
    if (!isValidStack(input.stack)) {
      errors.push("stack must be an array of non-empty strings");
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
      image: input.image ? (input.image as string).trim() : undefined,
      github_url: input.github_url ? (input.github_url as string).trim() : undefined,
      demo_url: input.demo_url ? (input.demo_url as string).trim() : undefined,
      category: input.category ? (input.category as string).trim() : undefined,
      year: input.year !== undefined && input.year !== null ? (input.year as number) : undefined,
      stack: input.stack ? (input.stack as string[]) : undefined,
    },
  };
}
