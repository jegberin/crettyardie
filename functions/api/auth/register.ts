import { json, err, type Ctx } from '../../_lib/types.js';
import { hashPassword, randomId, randomToken } from '../../_lib/auth.js';
import { sendVerificationEmail } from '../../_lib/email.js';

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  try {
    const body = await ctx.request.json() as Record<string, string>;
    const { username, email, password } = body;
    if (!username?.trim() || !email?.trim() || !password) return err('username, email and password are required');
    if (password.length < 8) return err('Password must be at least 8 characters');

    const { DB, RESEND_API_KEY, SITE_URL } = ctx.env;
    const existing = await DB.prepare('SELECT id FROM users WHERE email = ? OR username = ?')
      .bind(email.toLowerCase(), username.trim()).first();
    if (existing) return err('Email or username already in use', 409);

    const id = randomId();
    const hash = await hashPassword(password);
    await DB.prepare('INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)')
      .bind(id, username.trim(), email.toLowerCase(), hash).run();

    const token = randomToken();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    await DB.prepare('INSERT INTO email_tokens (id, user_id, token, type, expires_at) VALUES (?, ?, ?, ?, ?)')
      .bind(randomId(), id, token, 'verify', expires).run();

    await sendVerificationEmail(RESEND_API_KEY, SITE_URL, email.toLowerCase(), token);
    return json({ message: 'Registered! Check your email to verify your account.' }, 201);
  } catch (e) {
    console.error('[register]', e);
    return err('Registration failed', 500);
  }
}
