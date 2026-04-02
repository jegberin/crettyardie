import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getConsent } from '../lib/consent';

const GA_ID = 'G-9NF279H2FK';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    _gaInitialized?: boolean;
  }
}

function loadGA(): void {
  if (window._gaInitialized) return;
  window._gaInitialized = true;

  window.dataLayer = window.dataLayer || [];

  // GA requires the Arguments object (not a spread array) to be pushed onto
  // dataLayer — using rest params (...args) wraps them in a nested array and
  // silently breaks every command. This regular function + arguments is correct.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function () { window.dataLayer.push(arguments); } as typeof window.gtag;

  window.gtag('js', new Date());
  // send_page_view: false — we fire pageviews manually so SPA routes are tracked
  window.gtag('config', GA_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function sendPageview(path: string): void {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
  });
}

export function GoogleAnalytics() {
  const { pathname } = useLocation();

  // On first render: bootstrap GA if consent already exists (returning visitor)
  useEffect(() => {
    if (getConsent() === 'all') {
      loadGA();
      sendPageview(pathname);
    }

    const handleConsentUpdate = () => {
      if (getConsent() === 'all') {
        loadGA();
        sendPageview(pathname);
      }
    };

    window.addEventListener('crettyard:consent-updated', handleConsentUpdate);
    return () => window.removeEventListener('crettyard:consent-updated', handleConsentUpdate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On every SPA route change after GA is initialised
  useEffect(() => {
    if (getConsent() === 'all' && window._gaInitialized) {
      sendPageview(pathname);
    }
  }, [pathname]);

  return null;
}
