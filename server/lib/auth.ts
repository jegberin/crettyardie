import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET ?? 'crettyard-dev-jwt-secret-change-in-production';

const secretKey = new TextEncoder().encode(JWT_SECRET);

// ── JWT ──────────────────────────────────────────────────────────────────────

export interface TokenPayload extends JWTPayload {
  userId: string;
  username: string;
  email: string;
}

export async function signToken(payload: Omit<TokenPayload, keyof JWTPayload>): Promise<string> {
  return new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, secretKey);
  return payload as TokenPayload;
}

// ── Password hashing (PBKDF2 via Web Crypto) ─────────────────────────────────
// NOTE: bcrypt is NOT used because it requires native Node.js bindings that are
// incompatible with the Cloudflare Workers runtime (V8 isolates, no native modules).
// PBKDF2 via the standard Web Crypto API works identically in both Node.js ≥18
// and Cloudflare Workers, ensuring dev/production parity.  100 000 iterations of
// SHA-256 with a 16-byte random salt provides sufficient work factor for user
// passwords at this scale.

export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
  const key = await globalThis.crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await globalThis.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    key, 256
  );
  const saltHex = [...salt].map(b => b.toString(16).padStart(2, '0')).join('');
  const hashHex = [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join('');
  return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [saltHex, hashHex] = stored.split(':');
  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(h => parseInt(h, 16)));
  const key = await globalThis.crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await globalThis.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    key, 256
  );
  const computed = [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join('');
  return computed === hashHex;
}

// ── Helper ───────────────────────────────────────────────────────────────────

export function randomId(): string {
  return globalThis.crypto.randomUUID();
}

export function randomToken(): string {
  return [...globalThis.crypto.getRandomValues(new Uint8Array(32))]
    .map(b => b.toString(16).padStart(2, '0')).join('');
}
