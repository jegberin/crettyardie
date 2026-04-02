import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://crettyard.ie';

const NOINDEX_PATHS = new Set(['/privacy', '/cookies', '/terms']);

export function CanonicalTag() {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonical = pathname === '/' ? BASE_URL + '/' : BASE_URL + pathname;

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (NOINDEX_PATHS.has(pathname)) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.content = 'noindex, follow';
    } else {
      if (robotsMeta) {
        robotsMeta.remove();
      }
    }
  }, [pathname]);

  return null;
}
