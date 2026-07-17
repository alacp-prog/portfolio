// Usage: node scripts/seed-admin.mjs <email> [firstName] [lastName] [role]
// Generates a random temporary password (or uses SEED_PASSWORD env var if set) and
// its PBKDF2 hash, prints the SQL INSERT for the users table (stdout) and the
// plaintext password once (stderr) if it was auto-generated.
//
// Example:
//   node scripts/seed-admin.mjs admin@pixalacode.com Admin PixAlaCode admin > seed.sql
//   SEED_PASSWORD='...' node scripts/seed-admin.mjs admin@pixalacode.com Admin PixAlaCode admin > seed.sql
//   npx wrangler d1 execute portfolio_db --local --file=./seed.sql
//   npx wrangler d1 execute portfolio_db --remote --file=./seed.sql   # production

const PBKDF2_ITERATIONS = 100_000;

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return `${toHex(salt)}:${toHex(derived)}`;
}

function generatePassword() {
  const bytes = crypto.getRandomValues(new Uint8Array(15));
  return Buffer.from(bytes).toString("base64url");
}

function sqlEscape(value) {
  return value.replace(/'/g, "''");
}

const [, , email, firstName = "Admin", lastName = "Pix.Ala.Code", role = "admin"] = process.argv;

if (!email) {
  console.error("Usage: node scripts/seed-admin.mjs <email> [firstName] [lastName] [role]");
  process.exit(1);
}

if (!["admin", "editor", "viewer"].includes(role)) {
  console.error("role must be one of: admin, editor, viewer");
  process.exit(1);
}

const generated = !process.env.SEED_PASSWORD;
const password = process.env.SEED_PASSWORD || generatePassword();
const hash = await hashPassword(password);

const sql = `INSERT INTO users (first_name, last_name, email, password_hash, role, is_active) VALUES ('${sqlEscape(
  firstName
)}', '${sqlEscape(lastName)}', '${sqlEscape(email.trim().toLowerCase())}', '${hash}', '${role}', 1);`;

if (generated) {
  console.error(`Temporary password for ${email} (save it now, shown only once): ${password}`);
}
console.log(sql);
