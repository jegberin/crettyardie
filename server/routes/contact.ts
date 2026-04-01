import { Router } from 'express';
import formidable from 'formidable';
import { getDb } from '../db.js';
import { randomId } from '../lib/auth.js';

export const contactRouter = Router();

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const FROM = 'Crettyard.ie <noreply@digital.crettyard.ie>';
const TO_EMAIL = 'info@crettyard.ie';

const TYPE_LABELS: Record<string, string> = {
  advertise: 'Advertising enquiry',
  'add-business': 'Business directory submission',
  'edit-listing': 'Directory listing change request',
  'share-photos': 'Photo submission',
  'share-story': 'Story / history submission',
  'text-correction': 'Text correction suggestion',
  'submit-event': 'Event submission',
  general: 'General enquiry',
};

function row(label: string, value: string): string {
  if (!value?.trim()) return '';
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;font-size:14px;color:#111">${value.replace(/\n/g, '<br>')}</td></tr>`;
}

contactRouter.post('/', (req, res) => {
  const form = formidable({ maxFileSize: 10 * 1024 * 1024, maxFiles: 10 });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({ error: 'Invalid form data' });
      return;
    }

    const get = (key: string): string => {
      const v = fields[key];
      return Array.isArray(v) ? (v[0] ?? '') : (v ?? '');
    };

    const enquiryType = get('enquiry_type');
    const name = get('name');
    const email = get('email');
    const consent = get('consent');

    if (!enquiryType) { res.status(400).json({ error: 'Enquiry type is required' }); return; }
    if (!name) { res.status(400).json({ error: 'Name is required' }); return; }
    if (!email) { res.status(400).json({ error: 'Email is required' }); return; }
    if (!consent) { res.status(400).json({ error: 'Consent is required' }); return; }

    const data: Record<string, string> = {};
    for (const [k, v] of Object.entries(fields)) {
      data[k] = Array.isArray(v) ? (v[0] ?? '') : (v ?? '');
    }

    const uploadNames: string[] = [];
    for (const [, fileOrFiles] of Object.entries(files)) {
      const arr = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
      for (const f of arr) {
        if (f?.originalFilename) uploadNames.push(f.originalFilename);
      }
    }

    const typeLabel = TYPE_LABELS[enquiryType] ?? enquiryType;

    const contactRows = [
      row('Name', data.name),
      row('Email', data.email),
      row('Phone', data.phone ?? ''),
      row('Preferred contact', data.contact_method ?? ''),
      row('Best time', data.best_time ?? ''),
      row('Role', data.contact_role ?? ''),
    ].join('');

    const specificRows = Object.entries(data)
      .filter(([k]) => !['enquiry_type', 'name', 'email', 'phone', 'contact_method', 'best_time', 'contact_role', 'consent'].includes(k))
      .map(([k, v]) => row(k.replace(/_/g, ' '), v))
      .join('');

    const uploadSection = uploadNames.length
      ? `<h3 style="color:#1a472a;font-size:15px;margin:20px 0 6px">Uploads (${uploadNames.length})</h3><ul style="margin:0;padding-left:20px">${uploadNames.map(n => `<li style="font-size:13px;color:#444">${n}</li>`).join('')}</ul><p style="font-size:12px;color:#999">(File uploads not stored in dev mode)</p>`
      : '';

    const html = `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;background:#f9fafb;padding:24px">
<div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
  <div style="background:#1a472a;color:#fff;padding:16px 24px;border-radius:8px;margin-bottom:24px">
    <p style="margin:0;font-size:12px;opacity:0.7;text-transform:uppercase;letter-spacing:0.1em">New enquiry — Crettyard.ie (dev)</p>
    <h2 style="margin:4px 0 0;font-size:20px">${typeLabel}</h2>
  </div>
  <h3 style="color:#1a472a;font-size:15px;margin:20px 0 6px">Contact details</h3>
  <table style="border-collapse:collapse;width:100%">${contactRows}</table>
  <h3 style="color:#1a472a;font-size:15px;margin:20px 0 6px">Enquiry details</h3>
  <table style="border-collapse:collapse;width:100%">${specificRows}</table>
  ${uploadSection}
  <p style="margin-top:28px;font-size:11px;color:#999;border-top:1px solid #eee;padding-top:16px">Submitted via crettyard.ie contact form (dev) · ${new Date().toISOString()}</p>
</div></body></html>`;

    const submissionId = randomId();

    try {
      const db = getDb();
      db.prepare(
        `INSERT INTO contact_submissions (id, enquiry_type, name, email, structured_data, uploads, created_at)
         VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
      ).run(submissionId, enquiryType, name, email, JSON.stringify(data), JSON.stringify(uploadNames));
    } catch {
      /* schema not yet applied locally — non-fatal */
    }

    if (RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: FROM,
            to: TO_EMAIL,
            reply_to: email,
            subject: `[Crettyard.ie] ${typeLabel} from ${name}`,
            html,
          }),
        });
        if (!resendRes.ok) {
          const body = await resendRes.text();
          console.error('[contact] Resend error', resendRes.status, body);
          res.status(500).json({ error: 'Failed to send message. Please try again.' });
          return;
        }
      } catch (e) {
        console.error('[contact] Resend fetch error', e);
        res.status(500).json({ error: 'Failed to send message. Please try again.' });
        return;
      }
    } else {
      console.log('[contact] No RESEND_API_KEY — email not sent (dev mode). Data:', data);
    }

    res.status(201).json({ message: 'Thank you — your message has been sent.', id: submissionId });
  });
});
