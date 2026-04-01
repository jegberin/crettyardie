const FROM = 'Crettyard.ie <noreply@digital.crettyard.ie>';
const REPLY_TO = 'info@crettyard.ie';

interface EmailOpts { to: string; subject: string; html: string; }

async function sendEmail(apiKey: string, opts: EmailOpts): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, reply_to: REPLY_TO, ...opts }),
  });
  if (!res.ok) throw new Error(`Resend: ${res.status} ${await res.text()}`);
}

export async function sendVerificationEmail(apiKey: string, siteUrl: string, email: string, token: string): Promise<void> {
  const link = `${siteUrl}/noticeboard?verify_token=${token}`;
  await sendEmail(apiKey, {
    to: email,
    subject: 'Verify your Crettyard.ie account',
    html: `<div style="font-family:sans-serif;max-width:480px;margin:auto">
      <h2 style="color:#1a472a">Welcome to Crettyard.ie!</h2>
      <p>Please verify your email address to activate your account.</p>
      <a href="${link}" style="display:inline-block;padding:12px 24px;background:#1a472a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">Verify my email</a>
      <p style="color:#666;font-size:12px;margin-top:24px">This link expires in 24 hours.</p>
    </div>`,
  });
}

export async function sendPasswordResetEmail(apiKey: string, siteUrl: string, email: string, token: string): Promise<void> {
  const link = `${siteUrl}/noticeboard?reset_token=${token}`;
  await sendEmail(apiKey, {
    to: email,
    subject: 'Reset your Crettyard.ie password',
    html: `<div style="font-family:sans-serif;max-width:480px;margin:auto">
      <h2 style="color:#1a472a">Password Reset</h2>
      <p>We received a request to reset your Crettyard.ie password.</p>
      <a href="${link}" style="display:inline-block;padding:12px 24px;background:#1a472a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">Reset my password</a>
      <p style="color:#666;font-size:12px;margin-top:24px">This link expires in 1 hour.</p>
    </div>`,
  });
}
