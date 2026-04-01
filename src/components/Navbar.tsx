import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'History', href: '/history-heritage' },
  { name: 'Businesses', href: '/businesses' },
  { name: 'Community', href: '/community' },
  { name: "What's On", href: '/events' },
  { name: 'Visit', href: '/visit' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
        <Link to="/" className="text-2xl font-black tracking-tighter text-primary font-headline">Crettyard.ie</Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`font-headline tracking-tight text-sm uppercase font-bold transition-colors ${
                location.pathname === link.href
                  ? 'text-primary border-b-2 border-primary/20 pb-1'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden md:block px-6 py-2 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/10 hover:scale-105 transition-transform">
            Contact
          </Link>
          <button className="md:hidden p-2 text-primary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl p-6 flex flex-col gap-4 border-t border-surface-container"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-headline text-lg font-bold text-on-surface"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="w-full py-3 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider mt-4 text-center">
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
