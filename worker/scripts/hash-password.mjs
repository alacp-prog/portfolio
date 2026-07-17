// Usage: node scripts/hash-password.mjs "YourPassword123!"
// Prints an ADMIN_PASSWORD_HASH value (salt:hash hex, PBKDF2-SHA256, 100k iterations)
// compatible with src/lib/password.ts. Use it to set the ADMIN_PASSWORD_HASH secret:
//   wrangler secret put ADMIN_PASSWORD_HASH

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

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const hash = await hashPassword(password);
console.log(hash);
