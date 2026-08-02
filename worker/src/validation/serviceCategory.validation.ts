export interface CreateServiceCategoryInput {
  name: string;
  slug: string;
  description?: string;
  isNew: boolean;
}

export interface UpdateServiceCategoryInput {
  name?: string;
  slug?: string;
  description?: string;
  isNew?: boolean;
}

const COMBINING_DIACRITICS = new RegExp("[̀-ͯ]", "g");

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validateCreateServiceCategory(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: CreateServiceCategoryInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  if (!input.name || typeof input.name !== "string" || input.name.trim().length === 0) {
    errors.push("name is required and must be a non-empty string");
  }

  if (input.slug !== undefined && input.slug !== null) {
    if (typeof input.slug !== "string" || slugify(input.slug).length === 0) {
      errors.push("slug must be a non-empty string");
    }
  }

  if (input.description !== undefined && input.description !== null) {
    if (typeof input.description !== "string") {
      errors.push("description must be a string");
    }
  }

  if (input.isNew !== undefined && typeof input.isNew !== "boolean") {
    errors.push("isNew must be a boolean");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  const name = (input.name as string).trim();
  const slug = input.slug ? slugify(input.slug as string) : slugify(name);

  if (slug.length === 0) {
    return { valid: false, errors: ["Unable to derive a valid slug from name"] };
  }

  return {
    valid: true,
    errors: [],
    parsed: {
      name,
      slug,
      description: input.description ? (input.description as string).trim() : undefined,
      isNew: typeof input.isNew === "boolean" ? input.isNew : false,
    },
  };
}

export function validateUpdateServiceCategory(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: UpdateServiceCategoryInput;
} {
  const errors: string[] = [];
  const input = data as Record<string, unknown>;

  if (!input || typeof input !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  const hasFields =
    input.name !== undefined ||
    input.slug !== undefined ||
    input.description !== undefined ||
    input.isNew !== undefined;

  if (!hasFields) {
    return { valid: false, errors: ["At least one field is required for update"] };
  }

  if (input.name !== undefined) {
    if (typeof input.name !== "string" || input.name.trim().length === 0) {
      errors.push("name must be a non-empty string");
    }
  }

  if (input.slug !== undefined && input.slug !== null) {
    if (typeof input.slug !== "string" || slugify(input.slug).length === 0) {
      errors.push("slug must be a non-empty string");
    }
  }

  if (input.description !== undefined && input.description !== null) {
    if (typeof input.description !== "string") {
      errors.push("description must be a string");
    }
  }

  if (input.isNew !== undefined && typeof input.isNew !== "boolean") {
    errors.push("isNew must be a boolean");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    parsed: {
      name: input.name ? (input.name as string).trim() : undefined,
      slug: input.slug ? slugify(input.slug as string) : undefined,
      description: input.description ? (input.description as string).trim() : undefined,
      isNew: typeof input.isNew === "boolean" ? input.isNew : undefined,
    },
  };
}
