import { useEffect } from 'react';
import { getConsent } from '../lib/consent';

const GA_ID = 'G-9NF279H2FK';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    _gaInitialized?: boolean;
  }
}

function initGA(): void {
  if (typeof window === 'undefined') return;
  if (window._gaInitialized) return;
  window._gaInitialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function GoogleAnalytics() {
  useEffect(() => {
    if (getConsent() === 'all') {
      initGA();
    }

    const handleConsentUpdate = () => {
      if (getConsent() === 'all') {
        initGA();
      }
    };

    window.addEventListener('crettyard:consent-updated', handleConsentUpdate);
    return () => window.removeEventListener('crettyard:consent-updated', handleConsentUpdate);
  }, []);

  return null;
}
