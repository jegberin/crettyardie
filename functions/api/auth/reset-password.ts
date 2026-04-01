import { json, err, type Ctx } from '../../_lib/types.js';
import { hashPassword } from '../../_lib/auth.js';

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  try {
    const { token, password } = await ctx.request.json() as { token: string; password: string };
    if (!token || !password) return err('Token and password required');
    if (password.length < 8) return err('Password must be at least 8 characters');

    const { DB } = ctx.env;
    const row = await DB.prepare("SELECT * FROM email_tokens WHERE token = ? AND type = 'reset'")
      .bind(token).first<{ id: string; user_id: string; expires_at: string }>();
    if (!row) return err('Invalid or expired token');
    if (new Date(row.expires_at) < new Date()) {
      await DB.prepare('DELETE FROM email_tokens WHERE id = ?').bind(row.id).run();
      return err('Token expired. Please request a new reset link.');
    }
    const hash = await hashPassword(password);
    await DB.prepare('UPDATE users SET password_hash = ? WHERE id = ?').bind(hash, row.user_id).run();
    await DB.prepare('DELETE FROM email_tokens WHERE id = ?').bind(row.id).run();
    return json({ message: 'Password reset successfully. You can now log in.' });
  } catch (e) {
    console.error('[reset-password]', e);
    return err('Reset failed', 500);
  }
}
