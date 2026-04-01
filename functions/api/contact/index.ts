import { json, err, type Ctx } from '../../_lib/types.js';
import { randomId } from '../../_lib/auth.js';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const TO_EMAIL = 'info@crettyard.ie';
const FROM = 'Crettyard.ie <noreply@digital.crettyard.ie>';

function row(label: string, value: string): string {
  if (!value?.trim()) return '';
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;font-size:14px;color:#111">${value.replace(/\n/g, '<br>')}</td></tr>`;
}

function section(title: string, rows: string): string {
  const content = rows.trim();
  if (!content) return '';
  return `<h3 style="color:#1a472a;font-size:15px;margin:20px 0 6px">${title}</h3><table style="border-collapse:collapse;width:100%">${content}</table>`;
}

function buildEmail(data: Record<string, string>, uploads: string[]): string {
  const typeLabels: Record<string, string> = {
    advertise: 'Advertise on Crettyard.ie',
    'add-business': 'Add Business to Directory',
    'edit-listing': 'Correct / Change / Remove Listing',
    'share-photos': 'Share Photos',
    'share-story': 'Share a Story or Local History',
    'text-correction': 'Suggest a Text Correction',
    'submit-event': 'Submit an Event',
    general: 'General Enquiry',
  };

  const type = data.enquiry_type || 'unknown';
  const label = typeLabels[type] || type;

  const contactRows = [
    row('Name', data.name),
    row('Email', data.email),
    row('Phone', data.phone),
    row('Preferred contact', data.contact_method),
    row('Best time', data.best_time),
    row('Role', data.contact_role),
  ].join('');

  const specificRows = Object.entries(data)
    .filter(([k]) => !['enquiry_type', 'name', 'email', 'phone', 'contact_method', 'best_time', 'contact_role', 'consent'].includes(k))
    .map(([k, v]) => row(k.replace(/_/g, ' '), v))
    .join('');

  const uploadRows = uploads.length
    ? `<h3 style="color:#1a472a;font-size:15px;margin:20px 0 6px">Uploads (${uploads.length} file${uploads.length > 1 ? 's' : ''})</h3><ul style="margin:0;padding-left:20px">${uploads.map(u => `<li style="font-size:13px;color:#444;margin:2px 0">${u}</li>`).join('')}</ul>`
    : '';

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;background:#f9fafb;padding:24px">
<div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
  <div style="background:#1a472a;color:#fff;padding:16px 24px;border-radius:8px;margin-bottom:24px">
    <p style="margin:0;font-size:12px;opacity:0.7;text-transform:uppercase;letter-spacing:0.1em">New enquiry — Crettyard.ie</p>
    <h2 style="margin:4px 0 0;font-size:20px">${label}</h2>
  </div>
  ${section('Contact details', contactRows)}
  ${section('Enquiry details', specificRows)}
  ${uploadRows}
  <p style="margin-top:28px;font-size:11px;color:#999;border-top:1px solid #eee;padding-top:16px">Submitted via crettyard.ie contact form · ${new Date().toISOString()}</p>
</div></body></html>`;
}

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  try {
    const formData = await ctx.request.formData();
    const { DB, R2, RESEND_API_KEY } = ctx.env;

    const data: Record<string, string> = {};
    const uploadKeys: string[] = [];
    const files: Array<{ file: File; key: string }> = [];

    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        data[key] = value.trim();
      } else if (value instanceof File && value.size > 0) {
        if (!ALLOWED_TYPES.includes(value.type)) continue;
        if (value.size > MAX_FILE_SIZE) continue;
        const ext = value.name.split('.').pop() ?? 'bin';
        const storageKey = `contact/${randomId()}.${ext}`;
        files.push({ file: value, key: storageKey });
      }
    }

    if (!data.enquiry_type) return err('Enquiry type is required');
    if (!data.name?.trim()) return err('Name is required');
    if (!data.email?.trim()) return err('Email is required');
    if (!data.consent) return err('Consent is required');

    for (const { file, key } of files) {
      try {
        await R2.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
        uploadKeys.push(`${file.name} (${key})`);
      } catch {
        /* skip failed uploads silently */
      }
    }

    const submissionId = randomId();
    try {
      await DB.prepare(
        `INSERT INTO contact_submissions (id, enquiry_type, name, email, structured_data, uploads, created_at)
         VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
      )
        .bind(
          submissionId,
          data.enquiry_type,
          data.name,
          data.email,
          JSON.stringify(data),
          JSON.stringify(uploadKeys)
        )
        .run();
    } catch {
      /* DB write optional — don't fail the request if schema not yet applied */
    }

    const html = buildEmail(data, uploadKeys);
    const typeLabels: Record<string, string> = {
      advertise: 'Advertising enquiry',
      'add-business': 'Business directory submission',
      'edit-listing': 'Directory listing change request',
      'share-photos': 'Photo submission',
      'share-story': 'Story / history submission',
      'text-correction': 'Text correction suggestion',
      'submit-event': 'Event submission',
      general: 'General enquiry',
    };
    const subject = `[Crettyard.ie] ${typeLabels[data.enquiry_type] ?? 'Contact form'} from ${data.name}`;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: TO_EMAIL, reply_to: data.email, subject, html }),
    });

    if (!resendRes.ok) {
      const body = await resendRes.text();
      console.error('[contact] Resend error', resendRes.status, body);
      return err('Failed to send message. Please try again.', 500);
    }

    return json({ message: 'Thank you — your message has been sent.', id: submissionId }, 201);
  } catch (e) {
    console.error('[contact]', e);
    return err('Submission failed. Please try again.', 500);
  }
}
