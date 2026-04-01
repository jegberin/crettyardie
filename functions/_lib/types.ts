export interface Env {
  DB: D1Database;
  R2: R2Bucket;
  RESEND_API_KEY: string;
  JWT_SECRET: string;
  SITE_URL: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

export type Ctx = EventContext<Env, string, Record<string, unknown>>;

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function err(message: string, status = 400): Response {
  return json({ error: message }, status);
}

export async function requireAuth(
  request: Request,
  jwtSecret: string
): Promise<{ userId: string; username: string; email: string } | null> {
  const auth = request.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  try {
    const { verifyToken } = await import('./auth.js');
    return await verifyToken(jwtSecret, auth.slice(7));
  } catch {
    return null;
  }
}
