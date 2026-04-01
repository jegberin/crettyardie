import { json, err, type Ctx } from '../../_lib/types.js';

export async function onRequestGet(ctx: Ctx): Promise<Response> {
  try {
    const url = new URL(ctx.request.url);
    const token = url.searchParams.get('token');
    if (!token) return err('Token required');

    const { DB } = ctx.env;
    const row = await DB.prepare("SELECT * FROM email_tokens WHERE token = ? AND type = 'verify'")
      .bind(token).first<{ id: string; user_id: string; expires_at: string }>();
    if (!row) return err('Invalid or expired token');
    if (new Date(row.expires_at) < new Date()) {
      await DB.prepare('DELETE FROM email_tokens WHERE id = ?').bind(row.id).run();
      return err('Token expired. Please register again.');
    }
    await DB.prepare('UPDATE users SET email_verified = 1 WHERE id = ?').bind(row.user_id).run();
    await DB.prepare('DELETE FROM email_tokens WHERE id = ?').bind(row.id).run();
    return json({ message: 'Email verified! You can now log in.' });
  } catch (e) {
    console.error('[verify]', e);
    return err('Verification failed', 500);
  }
}
