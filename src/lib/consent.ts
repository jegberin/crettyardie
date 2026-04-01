export type ConsentValue = 'all' | 'essential' | null;

export const STORAGE_KEY = 'crettyard_cookie_consent';

export function getConsent(): ConsentValue {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'all' || v === 'essential') return v;
  } catch { /* */ }
  return null;
}
