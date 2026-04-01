import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Send } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-surface-container-lowest w-full py-24 border-t border-outline-variant/20">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-2xl font-black text-primary mb-8 font-headline tracking-tighter block">Crettyard.ie</Link>
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-xs">
            History, community and local life in the heart of County Laois.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-8 text-xs uppercase tracking-[0.2em]">Explore</h4>
          <ul className="space-y-5">
            <li><Link to="/history-heritage" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">History & Heritage</Link></li>
            <li><Link to="/businesses" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Business Directory</Link></li>
            <li><Link to="/community" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Schools & Childcare</Link></li>
            <li><Link to="/community" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Sport & Clubs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-8 text-xs uppercase tracking-[0.2em]">Connect</h4>
          <ul className="space-y-5">
            <li><Link to="/events" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">What's On</Link></li>
            <li><Link to="/visit" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Visit Crettyard</Link></li>
            <li><Link to="/contact" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Contact Us</Link></li>
            <li><Link to="/privacy" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-8 text-xs uppercase tracking-[0.2em]">Newsletter</h4>
          <p className="text-on-surface-variant text-sm mb-6">Stay updated with local news and events from across the area.</p>
          <div className="flex group">
            <input
              type="email"
              placeholder="Your email"
              className="bg-surface-container border-none rounded-l-2xl px-5 py-3 text-sm w-full focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <button className="bg-primary text-white px-5 py-3 rounded-r-2xl hover:bg-primary-container transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="pt-12 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-sm text-on-surface-variant font-medium">© 2025 Crettyard.ie. History, community and local life.</p>
        <div className="flex gap-8">
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><Trophy size={20} /></a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><Send size={20} /></a>
        </div>
      </div>
    </div>
  </footer>
);
