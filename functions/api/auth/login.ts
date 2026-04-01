import { json, err, type Ctx } from '../../_lib/types.js';
import { verifyPassword, signToken } from '../../_lib/auth.js';

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  try {
    const { email, password } = await ctx.request.json() as Record<string, string>;
    if (!email || !password) return err('Email and password required');

    const { DB, JWT_SECRET } = ctx.env;
    const user = await DB.prepare('SELECT * FROM users WHERE email = ?')
      .bind(email.toLowerCase())
      .first<{ id: string; username: string; email: string; password_hash: string; email_verified: number }>();

    if (!user) return err('Invalid email or password', 401);
    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) return err('Invalid email or password', 401);
    if (!user.email_verified) return err('Please verify your email first', 403);

    const token = await signToken(JWT_SECRET, { userId: user.id, username: user.username, email: user.email });
    return json({ token, username: user.username, email: user.email });
  } catch (e) {
    console.error('[login]', e);
    return err('Login failed', 500);
  }
}
