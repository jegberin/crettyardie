import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export interface TokenPayload extends JWTPayload {
  userId: string;
  username: string;
  email: string;
}

export async function signToken(secret: string, payload: Omit<TokenPayload, keyof JWTPayload>): Promise<string> {
  const key = new TextEncoder().encode(secret);
  return new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function verifyToken(secret: string, token: string): Promise<TokenPayload> {
  const key = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, key);
  return payload as TokenPayload;
}

// Password hashing uses PBKDF2 via the Web Crypto API (not bcrypt).
// Reason: bcrypt requires native Node.js bindings incompatible with the
// Cloudflare Workers V8 isolate runtime.  PBKDF2 is a standard Web Crypto
// primitive that works in both Node ≥18 and CF Workers without polyfills,
// ensuring identical behaviour in dev and production.
export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' }, key, 256);
  const s = [...salt].map(b => b.toString(16).padStart(2, '0')).join('');
  const h = [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join('');
  return `${s}:${h}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [saltHex, hashHex] = stored.split(':');
  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(h => parseInt(h, 16)));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' }, key, 256);
  const computed = [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join('');
  return computed === hashHex;
}

export function randomId(): string { return crypto.randomUUID(); }

export function randomToken(): string {
  return [...crypto.getRandomValues(new Uint8Array(32))].map(b => b.toString(16).padStart(2, '0')).join('');
}
