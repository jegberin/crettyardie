import { json, err, type Ctx } from '../../_lib/types.js';
import { randomId, randomToken } from '../../_lib/auth.js';
import { sendVerificationEmail } from '../../_lib/email.js';

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  try {
    const body = await ctx.request.json() as Record<string, string>;
    const { email } = body;
    if (!email?.trim()) return err('Email required');

    const { DB, RESEND_API_KEY, SITE_URL } = ctx.env;
    const msg = 'If that email is registered and unverified, a new link has been sent.';

    const user = await DB.prepare(
      'SELECT id, email_verified FROM users WHERE email = ?'
    ).bind(email.toLowerCase()).first<{ id: string; email_verified: number }>();
    if (!user || user.email_verified) return json({ message: msg });

    await DB.prepare("DELETE FROM email_tokens WHERE user_id = ? AND type = 'verify'")
      .bind(user.id).run();

    const token = randomToken();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    await DB.prepare('INSERT INTO email_tokens (id, user_id, token, type, expires_at) VALUES (?, ?, ?, ?, ?)')
      .bind(randomId(), user.id, token, 'verify', expires).run();

    await sendVerificationEmail(RESEND_API_KEY, SITE_URL, email.toLowerCase(), token);
    return json({ message: msg });
  } catch (e) {
    console.error('[resend-verification]', e);
    return err('Request failed', 500);
  }
}
