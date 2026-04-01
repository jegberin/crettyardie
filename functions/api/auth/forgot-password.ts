import { json, err, type Ctx } from '../../_lib/types.js';
import { randomId, randomToken } from '../../_lib/auth.js';
import { sendPasswordResetEmail } from '../../_lib/email.js';

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  try {
    const { email } = await ctx.request.json() as { email: string };
    if (!email) return err('Email required');

    const { DB, RESEND_API_KEY, SITE_URL } = ctx.env;
    const user = await DB.prepare('SELECT id FROM users WHERE email = ?')
      .bind(email.toLowerCase()).first<{ id: string }>();

    const ok = { message: 'If that email is registered, a reset link has been sent.' };
    if (!user) return json(ok);

    await DB.prepare("DELETE FROM email_tokens WHERE user_id = ? AND type = 'reset'").bind(user.id).run();
    const token = randomToken();
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await DB.prepare('INSERT INTO email_tokens (id, user_id, token, type, expires_at) VALUES (?, ?, ?, ?, ?)')
      .bind(randomId(), user.id, token, 'reset', expires).run();

    await sendPasswordResetEmail(RESEND_API_KEY, SITE_URL, email.toLowerCase(), token);
    return json(ok);
  } catch (e) {
    console.error('[forgot-password]', e);
    return err('Request failed', 500);
  }
}
