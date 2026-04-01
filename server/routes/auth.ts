import { Router } from 'express';
import { getDb } from '../db.js';
import {
  hashPassword, verifyPassword, signToken, randomId, randomToken,
} from '../lib/auth.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../lib/email.js';

export const authRouter = Router();

// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body as Record<string, string>;
    if (!username?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ error: 'username, email and password are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    const db = getDb();
    const existing = db.prepare('SELECT id FROM users WHERE email = ? OR username = ?').get(email.toLowerCase(), username.trim());
    if (existing) {
      return res.status(409).json({ error: 'Email or username already in use' });
    }
    const id = randomId();
    const hash = await hashPassword(password);
    db.prepare(
      'INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)'
    ).run(id, username.trim(), email.toLowerCase(), hash);

    const token = randomToken();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    db.prepare(
      'INSERT INTO email_tokens (id, user_id, token, type, expires_at) VALUES (?, ?, ?, ?, ?)'
    ).run(randomId(), id, token, 'verify', expires);

    await sendVerificationEmail(email.toLowerCase(), token);
    return res.status(201).json({ message: 'Registered! Check your email to verify your account.' });
  } catch (err) {
    console.error('[auth/register]', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

// GET /api/auth/verify?token=...
authRouter.get('/verify', (req, res) => {
  try {
    const { token } = req.query as { token: string };
    if (!token) return res.status(400).json({ error: 'Token required' });
    const db = getDb();
    const row = db.prepare(
      "SELECT * FROM email_tokens WHERE token = ? AND type = 'verify'"
    ).get(token) as { id: string; user_id: string; expires_at: string } | undefined;
    if (!row) return res.status(400).json({ error: 'Invalid or expired token' });
    if (new Date(row.expires_at) < new Date()) {
      db.prepare('DELETE FROM email_tokens WHERE id = ?').run(row.id);
      return res.status(400).json({ error: 'Token expired. Please register again.' });
    }
    db.prepare('UPDATE users SET email_verified = 1 WHERE id = ?').run(row.user_id);
    db.prepare('DELETE FROM email_tokens WHERE id = ?').run(row.id);
    return res.json({ message: 'Email verified! You can now log in.' });
  } catch (err) {
    console.error('[auth/verify]', err);
    return res.status(500).json({ error: 'Verification failed' });
  }
});

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body as Record<string, string>;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const db = getDb();
    const user = db.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).get(email.toLowerCase()) as { id: string; username: string; email: string; password_hash: string; email_verified: number } | undefined;
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });
    if (!user.email_verified) return res.status(403).json({ error: 'Please verify your email first' });
    const jwt = await signToken({ userId: user.id, username: user.username, email: user.email });
    return res.json({ token: jwt, username: user.username, email: user.email });
  } catch (err) {
    console.error('[auth/login]', err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

// POST /api/auth/forgot-password
authRouter.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body as { email: string };
    if (!email) return res.status(400).json({ error: 'Email required' });
    const db = getDb();
    const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase()) as { id: string } | undefined;
    if (!user) return res.json({ message: 'If that email is registered, a reset link has been sent.' });
    db.prepare("DELETE FROM email_tokens WHERE user_id = ? AND type = 'reset'").run(user.id);
    const token = randomToken();
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    db.prepare('INSERT INTO email_tokens (id, user_id, token, type, expires_at) VALUES (?, ?, ?, ?, ?)').run(
      randomId(), user.id, token, 'reset', expires
    );
    await sendPasswordResetEmail(email.toLowerCase(), token);
    return res.json({ message: 'If that email is registered, a reset link has been sent.' });
  } catch (err) {
    console.error('[auth/forgot-password]', err);
    return res.status(500).json({ error: 'Request failed' });
  }
});

// POST /api/auth/reset-password
authRouter.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body as { token: string; password: string };
    if (!token || !password) return res.status(400).json({ error: 'Token and password required' });
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });
    const db = getDb();
    const row = db.prepare(
      "SELECT * FROM email_tokens WHERE token = ? AND type = 'reset'"
    ).get(token) as { id: string; user_id: string; expires_at: string } | undefined;
    if (!row) return res.status(400).json({ error: 'Invalid or expired token' });
    if (new Date(row.expires_at) < new Date()) {
      db.prepare('DELETE FROM email_tokens WHERE id = ?').run(row.id);
      return res.status(400).json({ error: 'Token expired. Please request a new reset link.' });
    }
    const hash = await hashPassword(password);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, row.user_id);
    db.prepare('DELETE FROM email_tokens WHERE id = ?').run(row.id);
    return res.json({ message: 'Password reset successfully. You can now log in.' });
  } catch (err) {
    console.error('[auth/reset-password]', err);
    return res.status(500).json({ error: 'Reset failed' });
  }
});
