export interface CreateSolutionInput {
  name: string;
  slug: string;
  description?: string;
  priceType: "fixed" | "quote";
  price?: number;
  duration?: string;
  image?: string;
  isNew: boolean;
}

export interface UpdateSolutionInput {
  name?: string;
  slug?: string;
  description?: string;
  priceType?: "fixed" | "quote";
  price?: number | null;
  duration?: string;
  image?: string;
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

export function validateCreateSolution(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: CreateSolutionInput;
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

  if (input.priceType !== "fixed" && input.priceType !== "quote") {
    errors.push("priceType is required and must be 'fixed' or 'quote'");
  }

  if (input.priceType === "fixed") {
    if (typeof input.price !== "number" || Number.isNaN(input.price) || input.price < 0) {
      errors.push("price is required and must be a non-negative number when priceType is 'fixed'");
    }
  }

  if (input.duration !== undefined && input.duration !== null) {
    if (typeof input.duration !== "string" || input.duration.trim().length === 0) {
      errors.push("duration must be a non-empty string");
    }
  }

  if (input.image !== undefined && input.image !== null) {
    if (typeof input.image !== "string" || input.image.trim().length === 0) {
      errors.push("image must be a non-empty string");
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
      priceType: input.priceType as "fixed" | "quote",
      price: input.priceType === "fixed" ? (input.price as number) : undefined,
      duration: input.duration ? (input.duration as string).trim() : undefined,
      image: input.image ? (input.image as string).trim() : undefined,
      isNew: typeof input.isNew === "boolean" ? input.isNew : false,
    },
  };
}

export function validateUpdateSolution(data: unknown): {
  valid: boolean;
  errors: string[];
  parsed?: UpdateSolutionInput;
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
    input.priceType !== undefined ||
    input.price !== undefined ||
    input.duration !== undefined ||
    input.image !== undefined ||
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

  if (input.priceType !== undefined && input.priceType !== "fixed" && input.priceType !== "quote") {
    errors.push("priceType must be 'fixed' or 'quote'");
  }

  if (input.priceType === "fixed") {
    if (typeof input.price !== "number" || Number.isNaN(input.price) || input.price < 0) {
      errors.push("price is required and must be a non-negative number when priceType is 'fixed'");
    }
  } else if (input.price !== undefined && input.price !== null) {
    if (typeof input.price !== "number" || Number.isNaN(input.price) || input.price < 0) {
      errors.push("price must be a non-negative number");
    }
  }

  if (input.duration !== undefined && input.duration !== null) {
    if (typeof input.duration !== "string" || input.duration.trim().length === 0) {
      errors.push("duration must be a non-empty string");
    }
  }

  if (input.image !== undefined && input.image !== null) {
    if (typeof input.image !== "string" || input.image.trim().length === 0) {
      errors.push("image must be a non-empty string");
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
      priceType: input.priceType as "fixed" | "quote" | undefined,
      price:
        input.priceType === "quote"
          ? null
          : typeof input.price === "number"
            ? input.price
            : undefined,
      duration: input.duration ? (input.duration as string).trim() : undefined,
      image: input.image ? (input.image as string).trim() : undefined,
      isNew: typeof input.isNew === "boolean" ? input.isNew : undefined,
    },
  };
}
