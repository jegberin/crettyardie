import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, MapPin, Globe, PlusCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Brand link icons ─────────────────────────────────────────────────────────

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="#1877F2" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="25%" stopColor="#e6683c"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="75%" stopColor="#cc2366"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const GoogleMapsIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
    <path fill="#4285F4" d="M12 0C7.802 0 4 3.403 4 7.602 4 11.8 12 24 12 24s8-12.2 8-16.398C20 3.403 16.199 0 12 0z"/>
    <path fill="#3367D6" d="M12 0v24s8-12.2 8-16.398C20 3.403 16.199 0 12 0z"/>
    <circle cx="12" cy="7.6" r="3" fill="#fff"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="#0A66C2" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="#1DB954" aria-hidden="true">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

function getLinkIcon(label: string, href: string) {
  const l = label.toLowerCase();
  const u = href.toLowerCase();
  if (l.includes('facebook') || u.includes('facebook.com')) return <FacebookIcon />;
  if (l.includes('instagram') || u.includes('instagram.com')) return <InstagramIcon />;
  if (l.includes('google maps') || u.includes('maps.app.goo.gl') || (u.includes('google') && u.includes('maps'))) return <GoogleMapsIcon />;
  if (l.includes('linkedin') || u.includes('linkedin.com')) return <LinkedInIcon />;
  if (l.includes('spotify') || u.includes('spotify.com') || l.includes('podcast')) return <SpotifyIcon />;
  if (l.includes('twitter') || l.includes(' x ') || u.includes('twitter.com') || u.includes('x.com')) return <XIcon />;
  if (l.includes('website') || l.includes('www') || l.includes('store page') || l.includes('tourism')) return <Globe size={11} />;
  return <ExternalLink size={11} />;
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface BizLink {
  label: string;
  href: string;
}

interface Business {
  name: string;
  tradingAs?: string;
  sector: string;
  sectorColor: string;
  description: string;
  logo?: string;
  logoFit?: 'contain' | 'cover';
  initials: string;
  location?: string;
  links: BizLink[];
  note?: string;
}

// ─── All businesses — unified list ───────────────────────────────────────────

const ALL_BUSINESSES: Business[] = [
  {
    name: 'Inver Geneva Stores',
    sector: 'Fuel & Convenience',
    sectorColor: 'bg-blue-100 text-blue-800',
    description:
      'Fuel, convenience shop, deli, car wash and more at the Crettyard junction. Inver Geneva Stores is a landmark local service point on the N78, serving residents and passing trade daily.',
    logo: '/logos/inver.svg',
    initials: 'IG',
    location: 'Crettyard junction, N78',
    links: [
      { label: 'Website', href: 'https://inverenergy.ie/blog/station/inver-geneva-stores/' },
      { label: 'Facebook', href: 'https://www.facebook.com/invergeneva' },
    ],
  },
  {
    name: 'Tirlán FarmLife',
    tradingAs: 'Crettyard store',
    sector: 'Agricultural Supply',
    sectorColor: 'bg-green-100 text-green-800',
    description:
      'The Tirlán FarmLife branch at Crettyard supports farming in the area with a full range of agricultural inputs, hardware, feed, animal health products and farm supplies.',
    logo: '/logos/tirlan.svg',
    initials: 'TF',
    location: 'Crettyard junction',
    links: [
      { label: 'Store page', href: 'https://www.tirlanfarmlife.com/store/Crettyard' },
    ],
  },
  {
    name: 'Crettyard Stone',
    sector: 'Stone Supply',
    sectorColor: 'bg-stone-100 text-stone-700',
    description:
      'A specialist supplier of natural building stone including sandstone, granite, paving and walling products, serving builders, architects and homeowners across Leinster and beyond.',
    logo: '/logos/crettyardstone.jpg',
    initials: 'CS',
    location: 'Crettyard, Co. Laois',
    links: [
      { label: 'Website', href: 'https://www.crettyardstone.ie/' },
      { label: 'Facebook', href: 'https://www.facebook.com/crettyardstone' },
    ],
  },
  {
    name: 'Wilson Engineering',
    tradingAs: 'Home of the Super Move',
    sector: 'Agricultural Engineering',
    sectorColor: 'bg-orange-100 text-orange-800',
    description:
      'A long-established agricultural engineering firm on the Carlow Road in Crettyard, best known for the Super Move machinery range and engineering work for farming customers throughout the region.',
    logo: '/logos/wilson.png',
    initials: 'WE',
    location: 'Carlow Road, Crettyard',
    links: [
      { label: 'Website', href: 'https://www.wilsonengineering.ie/' },
      { label: 'Facebook', href: 'https://www.facebook.com/p/Wilson-Engineering-100057660361297/' },
    ],
  },
  {
    name: 'Master My Garden',
    sector: 'Gardening & Media',
    sectorColor: 'bg-emerald-100 text-emerald-800',
    description:
      'Based in County Laois, Master My Garden with John Jones is a gardening education business, popular podcast and media project covering practical gardening for Irish conditions.',
    logo: '/logos/mastermygarden.jpg',
    initials: 'MG',
    links: [
      { label: 'Website', href: 'https://mastermygarden.com/' },
      { label: 'Podcast', href: 'https://open.spotify.com/show/4dXYLSfG99ZLhUQuLGwNFr' },
      { label: 'Facebook', href: 'https://www.facebook.com/MasterMyGarden' },
      { label: 'Instagram', href: 'https://www.instagram.com/mastermygarden' },
    ],
  },
  {
    name: 'Design By Nature',
    tradingAs: 'Wildflowers.ie',
    sector: 'Wildflower & Ecology',
    sectorColor: 'bg-yellow-100 text-yellow-800',
    description:
      "Established in 1990 by Sandro Cafolla in Monavea, Crettyard, Design By Nature is Ireland's leading specialist in native wildflower seed production and biodiversity-focused growing, supplying seeds for rewilding and meadow restoration.",
    logo: '/logos/wildflowers.jpg',
    initials: 'DBN',
    location: 'Monavea, Crettyard',
    links: [
      { label: 'Website', href: 'http://www.wildflowers.ie/' },
    ],
  },
  {
    name: 'Mpowered Performance',
    tradingAs: 'Performance & Rehabilitation',
    sector: 'Sports Therapy',
    sectorColor: 'bg-purple-100 text-purple-800',
    description:
      'A local sports rehabilitation and performance practice serving the Crettyard area, specialising in injury assessment, rehabilitation and conditioning support for athletes and active individuals.',
    initials: 'MP',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/mpoweredperformance' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mpowered-performance' },
    ],
  },
  {
    name: 'Crettyard Digital',
    sector: 'Web & IT Services',
    sectorColor: 'bg-sky-100 text-sky-800',
    description:
      'A local web design and digital services business providing website development, digital marketing and IT support for trades, retailers and small businesses in the Laois area.',
    logo: '/logos/crettyarddigital.png',
    initials: 'CD',
    location: 'Crettyard, Co. Laois',
    links: [
      { label: 'Website', href: 'https://digital.crettyard.ie' },
      { label: 'Facebook', href: 'https://www.facebook.com/crettyarddigital' },
      { label: 'Instagram', href: 'https://www.instagram.com/crettyarddigital' },
    ],
  },
  {
    name: 'Mayo-Doonane Credit Union',
    sector: 'Financial Services',
    sectorColor: 'bg-teal-100 text-teal-800',
    description:
      'Serving members in the Mayo and Doonane area of County Laois, providing savings, loans and financial services to the local rural community.',
    logo: '/logos/mayodoonane-cu.jpg',
    initials: 'MDCU',
    location: 'Doonane, Crettyard',
    links: [
      { label: 'Google Maps', href: 'https://maps.app.goo.gl/SaKPFbcUH2Qdy8kF7' },
    ],
  },
  {
    name: 'Clonbrock Heritage Centre',
    sector: 'Heritage & Tourism',
    sectorColor: 'bg-amber-100 text-amber-800',
    description:
      'Listed as a local heritage attraction by Laois Tourism, preserving and sharing the story of the Clonbrock estate and its place in the wider local history of the Crettyard area.',
    logo: '/logos/clonbrock.jpg',
    logoFit: 'cover',
    initials: 'CHC',
    location: 'Clonbrock, Crettyard',
    links: [
      { label: 'Laois Tourism', href: 'https://laois.ie/heritage-and-conservation/heritage/heritage-centres' },
    ],
  },
  {
    name: "Behan's Pub",
    sector: 'Pub & Social Venue',
    sectorColor: 'bg-red-100 text-red-800',
    description:
      'A local country pub near Newtown and Turra Hill, serving the Crettyard community as a social gathering point.',
    logo: '/logos/behans.jpg',
    logoFit: 'cover',
    initials: 'BP',
    links: [
      { label: 'Google Maps', href: 'https://maps.app.goo.gl/DXjN62zhVZRFZfaN7' },
    ],
  },
  {
    name: 'Crettyard Coal Yard',
    tradingAs: 'Galtee Fuels Ltd · Newtown Cross',
    sector: 'Fuel Merchant',
    sectorColor: 'bg-blue-100 text-blue-800',
    description:
      'Solid fuel depot open to the public at Newtown Cross. Supplying coal, briquettes, wood pellets, gas (FloGas), firelogs, water softener salt and fireside accessories — Mon–Fri 9am–5pm, Sat 9am–1pm.',
    logo: '/logos/galtee.jpg',
    logoFit: 'cover',
    initials: 'GF',
    links: [
      { label: 'Facebook', href: 'https://www.facebook.com/p/Crettyard-Coal-Yard-100054259100584/' },
    ],
  },
  {
    name: 'Blue Equipment (Ireland) Ltd',
    sector: 'Machinery & Plant',
    sectorColor: 'bg-indigo-100 text-indigo-800',
    description:
      'Plant machinery and equipment business, listed with a Crettyard-area address at Fairymount.',
    logo: '/logos/bluegroup.svg',
    initials: 'BE',
    links: [
      { label: 'Blue Group', href: 'https://www.blue-group.co.uk' },
    ],
  },
  {
    name: 'McDonald Concrete Flooring Ltd',
    sector: 'Concrete & Construction',
    sectorColor: 'bg-slate-100 text-slate-700',
    description:
      'Concrete flooring and construction contractor registered with a Crettyard address.',
    initials: 'MCF',
    links: [
      { label: 'Google Maps', href: 'https://maps.app.goo.gl/7Jrqqjpo7wQCkQps6' },
    ],
  },
  {
    name: 'Holistic Hair & Beauty',
    sector: 'Health & Beauty',
    sectorColor: 'bg-rose-100 text-rose-800',
    description:
      'A local hair and beauty business in the area.',
    logo: '/logos/holistichair.jpg',
    logoFit: 'cover',
    initials: 'HHB',
    links: [
      { label: 'Google Maps', href: 'https://www.google.ie/maps/place/Holistic+Hair+%26+Beauty/@52.845574,-7.1012737' },
    ],
  },
];

// ─── Logo with initials fallback ─────────────────────────────────────────────

function BusinessLogo({ logo, logoFit = 'contain', initials, name }: { logo?: string; logoFit?: 'contain' | 'cover'; initials: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    const imgClass = logoFit === 'cover'
      ? 'w-full h-full object-cover'
      : 'w-full h-full object-contain p-1';
    return (
      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-sm border border-outline-variant/10 shrink-0">
        <img
          src={logo}
          alt={`${name} logo`}
          className={imgClass}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-16 h-16 rounded-2xl signature-gradient flex items-center justify-center shrink-0">
      <span className="text-white font-extrabold text-sm tracking-wide">{initials}</span>
    </div>
  );
}

// ─── Business card ────────────────────────────────────────────────────────────

function BusinessCard({ biz, idx }: { biz: Business; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (idx % 2) * 0.08 }}
      className="group bg-surface-container-lowest rounded-3xl border border-outline-variant/10 p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5 transition-all"
    >
      {/* Header: logo + name */}
      <div className="flex items-start gap-5 mb-5">
        <BusinessLogo logo={biz.logo} logoFit={biz.logoFit} initials={biz.initials} name={biz.name} />
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="font-headline text-xl font-bold leading-tight">{biz.name}</h3>
          {biz.tradingAs && (
            <p className="text-xs text-on-surface-variant mt-1">{biz.tradingAs}</p>
          )}
        </div>
      </div>

      {/* Sector badge */}
      <span className={`inline-block self-start text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 ${biz.sectorColor}`}>
        {biz.sector}
      </span>

      {/* Description */}
      <p className="text-on-surface-variant text-sm leading-relaxed flex-grow mb-4">{biz.description}</p>

      {/* Note (for limited-presence entries) */}
      {biz.note && (
        <p className="text-xs text-on-surface-variant/60 italic mb-4 border-l-2 border-outline-variant/30 pl-3">
          {biz.note}
        </p>
      )}

      {/* Location */}
      {biz.location && (
        <p className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-4">
          <MapPin size={12} className="text-primary shrink-0" />
          {biz.location}
        </p>
      )}

      {/* Links */}
      {biz.links.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/10">
          {biz.links.map((lk) => (
            <a
              key={lk.href}
              href={lk.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-xs font-semibold text-on-surface-variant hover:bg-primary hover:text-white transition-all"
            >
              {getLinkIcon(lk.label, lk.href)}
              {lk.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessesPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ArrowRight size={12} />
              <span className="text-primary">Businesses</span>
            </nav>

            <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs mb-4">Crettyard, County Laois</p>
            <h1 className="font-headline text-5xl md:text-8xl font-extrabold text-on-surface tracking-tighter leading-[0.9] mb-8">
              Crettyard <span className="text-primary italic">Businesses</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-6">
              Crettyard and its surrounding townlands support a varied local economy shaped by farming, practical services, skilled trades, specialist manufacturing, and small independent enterprise. The area works as a rural network of junction services, workshops, suppliers, growers, contractors and specialist businesses serving local people and customers further afield.
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              One of Crettyard's strengths is the range of enterprise packed into a small rural area — from fuel, farm supply and natural stone to wildflower production, engineering, digital services and heritage. This page brings them all together in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Business grid ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...ALL_BUSINESSES].sort((a, b) => a.name.localeCompare(b.name)).map((biz, idx) => (
              <BusinessCard key={biz.name} biz={biz} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Business Map ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs mb-4">Directory Map</p>
            <h2 className="font-headline text-4xl font-extrabold mb-8 tracking-tight">Find Crettyard Businesses</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-4">
              All businesses in this directory are mapped across the Crettyard area — from the junction at Newtown Cross to the surrounding townlands of Doonane, Clonbrock, Moscow and Fairymount.
            </p>
            <p className="text-on-surface-variant text-base leading-relaxed mb-10">
              Click any marker to see the business name and location. Use the full-screen button to explore on Google Maps.
            </p>
          </div>
          <div className="lg:col-span-7 h-[480px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 relative border border-outline-variant/10">
            <iframe
              title="Crettyard Businesses Map"
              src="https://www.google.com/maps/d/embed?mid=1_VP3c3y1gOZLY5MN9X5ywH5gtkpirXM&ehbc=2E312F"
              width="100%"
              height="100%"
              style={{ border: 0, marginTop: '-60px', height: 'calc(100% + 60px)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── Submission CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto signature-gradient rounded-[2rem] p-12 md:p-20 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-on-primary">
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-6 tracking-tighter">
                Is your business missing?
              </h2>
              <p className="text-lg opacity-90 leading-relaxed mb-4">
                This directory grows over time. If your business is not listed, or if you have updated contact details, a corrected description, a logo or new links to share, we would love to hear from you.
              </p>
              <p className="text-base opacity-75 leading-relaxed">
                Business owners can submit opening hours, photos and a short description for a more complete listing. There is no charge to be included.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-on-primary flex flex-col justify-between gap-8">
              <div>
                <h3 className="font-headline text-2xl font-bold mb-5">What we'll need from you</h3>
                <ul className="space-y-3">
                  {[
                    'Business name and category',
                    'Short description of what you do',
                    'Contact details and opening hours',
                    'Website, social links or logo (optional)',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm opacity-90">
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0 opacity-80" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm opacity-70 leading-relaxed">
                  It takes about two minutes. There is no charge to be listed in the directory.
                </p>
              </div>
              <Link
                to="/contact?category=add-business"
                className="w-full px-6 py-4 rounded-xl bg-white text-primary font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg"
              >
                <PlusCircle size={16} /> Add my business
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
