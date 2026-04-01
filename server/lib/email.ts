const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const FROM = 'Crettyard.ie <noreply@digital.crettyard.ie>';
const REPLY_TO = 'info@crettyard.ie';

const SITE_URL = process.env.SITE_URL ?? `http://localhost:5000`;

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail(opts: EmailOptions): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping send. Would have sent:', opts.subject, 'to', opts.to);
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, reply_to: REPLY_TO, ...opts }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('[email] Resend error:', res.status, text);
    throw new Error(`Email send failed: ${res.status}`);
  }
}

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const link = `${SITE_URL}/noticeboard?verify_token=${token}`;
  await sendEmail({
    to: email,
    subject: 'Verify your Crettyard.ie account',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#1a472a">Welcome to Crettyard.ie!</h2>
        <p>Thanks for registering. Please verify your email address to activate your account.</p>
        <a href="${link}" style="display:inline-block;padding:12px 24px;background:#1a472a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">
          Verify my email
        </a>
        <p style="color:#666;font-size:12px;margin-top:24px">This link expires in 24 hours. If you didn't register, you can ignore this email.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const link = `${SITE_URL}/noticeboard?reset_token=${token}`;
  await sendEmail({
    to: email,
    subject: 'Reset your Crettyard.ie password',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#1a472a">Password Reset</h2>
        <p>We received a request to reset your Crettyard.ie password.</p>
        <a href="${link}" style="display:inline-block;padding:12px 24px;background:#1a472a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">
          Reset my password
        </a>
        <p style="color:#666;font-size:12px;margin-top:24px">This link expires in 1 hour. If you didn't request a reset, you can ignore this email.</p>
      </div>
    `,
  });
}
