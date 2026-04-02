import React from 'react';
import { Link } from 'react-router-dom';
import { CookieSettingsLink } from './CookieBanner';

export const Footer = () => (
  <footer className="bg-surface-container-lowest w-full py-20 border-t border-outline-variant/20">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

        {/* Brand */}
        <div>
          <Link to="/" className="text-2xl font-black text-primary mb-6 font-headline tracking-tighter block">
            Crettyard.ie
          </Link>
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-xs">
            History, community and local life in the heart of County Laois.
          </p>
          <Link
            to="/contact?category=advertise"
            className="inline-block mt-5 px-5 py-2.5 rounded-full signature-gradient text-white font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-md shadow-primary/20"
          >
            Advertise on this site?
          </Link>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-bold text-primary mb-6 text-xs uppercase tracking-[0.2em]">Explore</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Home</Link></li>
            <li><Link to="/history-heritage" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">History &amp; Heritage</Link></li>
            <li><Link to="/businesses" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Business Directory</Link></li>
            <li><Link to="/community" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Community</Link></li>
            <li><Link to="/noticeboard" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Notice Board</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-bold text-primary mb-6 text-xs uppercase tracking-[0.2em]">Connect</h4>
          <ul className="space-y-4">
            <li><Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Contact Us</Link></li>
            <li><Link to="/privacy" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Cookie Policy</Link></li>
            <li><Link to="/terms" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">Terms of Service</Link></li>
            <li><CookieSettingsLink /></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="pt-10 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-on-surface-variant font-medium">
          © 2026 Crettyard.ie. History, community and local life.
        </p>
        <a
          href="https://digital.crettyard.ie"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          <img src="/logos/crettyarddigital.webp" alt="" className="w-4 h-4 rounded-sm object-contain" aria-hidden="true" />
          Web design by <span className="font-semibold">Crettyard Digital</span>
        </a>
      </div>
    </div>
  </footer>
);
