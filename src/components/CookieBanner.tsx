import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Settings } from 'lucide-react';

const STORAGE_KEY = 'crettyard_cookie_consent';

export type ConsentValue = 'all' | 'essential' | null;

export function getConsent(): ConsentValue {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'all' || v === 'essential') return v;
  } catch { /* */ }
  return null;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = (level: 'all' | 'essential') => {
    try { localStorage.setItem(STORAGE_KEY, level); } catch { /* */ }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="max-w-4xl mx-auto bg-[#1a2e1a] text-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <Cookie size={22} className="text-green-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-headline font-bold text-base md:text-lg text-white leading-snug mb-1">
                        Cookies &amp; privacy
                      </h2>
                      <p className="text-white/70 text-sm leading-relaxed">
                        We use essential cookies to keep the site working. With your consent we also use analytics cookies to understand how people use Crettyard.ie — no personal data is shared.{' '}
                        <Link to="/cookies" onClick={() => setVisible(false)} className="text-green-300 hover:text-green-200 underline underline-offset-2">
                          Cookie policy
                        </Link>
                      </p>
                    </div>
                    <button
                      onClick={() => accept('essential')}
                      aria-label="Close and accept essential cookies only"
                      className="flex-shrink-0 text-white/40 hover:text-white/80 transition-colors mt-0.5"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/60">
                          <div className="bg-white/5 rounded-xl p-3">
                            <p className="font-semibold text-white/90 mb-1">Essential cookies</p>
                            <p>Always active. Required for login, notice board, and form submissions. Cannot be disabled.</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-3">
                            <p className="font-semibold text-white/90 mb-1">Analytics cookies (Google Analytics)</p>
                            <p>Optional. Helps us understand site usage — pages visited, time on site, device type. No personal data shared. Only loaded after your consent.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => accept('all')}
                      className="px-5 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:brightness-110 transition shadow-lg shadow-primary/20"
                    >
                      Accept all
                    </button>
                    <button
                      onClick={() => accept('essential')}
                      className="px-5 py-2.5 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition"
                    >
                      Essential only
                    </button>
                    <button
                      onClick={() => setShowDetails(v => !v)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-white/60 hover:text-white text-sm font-medium transition"
                    >
                      <Settings size={14} />
                      {showDetails ? 'Hide details' : 'Show details'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CookieSettingsLink() {
  const [, forceUpdate] = useState(0);

  const reset = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* */ }
    forceUpdate(n => n + 1);
    window.location.reload();
  };

  return (
    <button
      onClick={reset}
      className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
    >
      Cookie settings
    </button>
  );
}
