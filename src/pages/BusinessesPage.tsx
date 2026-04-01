import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, MapPin, Send, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      { label: 'Mayo News article', href: 'https://www.mayonews.ie/news/home/1420927/mayo-credit-union-to-expand-with-new-merger.html' },
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
    links: [],
  },
  {
    name: 'Galtee Fuels',
    tradingAs: 'Newtown Cross',
    sector: 'Fuel Merchant',
    sectorColor: 'bg-blue-100 text-blue-800',
    description:
      'Fuel merchant and coal supplier at Newtown Cross, serving local households and farms in the area.',
    initials: 'GF',
    links: [],
    note: 'Current trading status to be confirmed locally before launch.',
  },
  {
    name: 'Blue Equipment (Ireland) Ltd',
    sector: 'Machinery & Plant',
    sectorColor: 'bg-indigo-100 text-indigo-800',
    description:
      'Plant machinery and equipment business, listed with a Crettyard-area address at Fairymount.',
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
    links: [],
    note: 'No public website confirmed.',
  },
  {
    name: 'Leinster Retrofit Ltd',
    sector: 'Retrofit & Installation',
    sectorColor: 'bg-lime-100 text-lime-800',
    description:
      'Retrofit and energy installation services, registered with a Crettyard address.',
    initials: 'LR',
    links: [],
    note: 'No public website confirmed.',
  },
  {
    name: 'D&B Civil Engineering Ltd',
    sector: 'Civil Engineering',
    sectorColor: 'bg-orange-100 text-orange-800',
    description:
      'Civil engineering contractor with a Crettyard address in company registration records.',
    initials: 'DB',
    links: [],
    note: 'No public website confirmed.',
  },
  {
    name: 'K1-A Project Management Ltd',
    sector: 'Project Management',
    sectorColor: 'bg-violet-100 text-violet-800',
    description:
      'Project management and construction services, linked to the Crettyard area in company records.',
    initials: 'K1A',
    links: [],
    note: 'No public website confirmed.',
  },
  {
    name: 'Problast Ltd',
    sector: 'Surface Preparation',
    sectorColor: 'bg-zinc-100 text-zinc-700',
    description:
      'Surface preparation and industrial blasting, listed with a Crettyard-area address.',
    initials: 'PB',
    links: [],
    note: 'No public website confirmed.',
  },
  {
    name: 'Under a Cover Ltd',
    sector: 'Construction & Coverings',
    sectorColor: 'bg-cyan-100 text-cyan-800',
    description:
      'Construction and coverings contractor included in company registration records for the area.',
    initials: 'UAC',
    links: [],
    note: 'No public website confirmed.',
  },
  {
    name: 'Farnans Pigs Ltd',
    sector: 'Agriculture',
    sectorColor: 'bg-pink-100 text-pink-800',
    description:
      'An active agricultural business in the Crettyard area, specialising in pig farming.',
    initials: 'FP',
    links: [],
    note: 'No public website confirmed.',
  },
  {
    name: 'Holistic Hair & Beauty',
    sector: 'Health & Beauty',
    sectorColor: 'bg-rose-100 text-rose-800',
    description:
      'A local hair and beauty business in the area.',
    initials: 'HHB',
    links: [],
    note: 'Web presence and current trading details need local confirmation.',
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
              <ExternalLink size={11} />
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
            {ALL_BUSINESSES.map((biz, idx) => (
              <BusinessCard key={biz.name} biz={biz} idx={idx} />
            ))}
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
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-on-primary">
              <h3 className="font-headline text-2xl font-bold mb-6">Submit a listing</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Business name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 transition-colors text-sm"
                    placeholder="Your business name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Contact email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 transition-colors text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Website or social page</label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 transition-colors text-sm"
                    placeholder="https://"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Brief description</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 transition-colors text-sm resize-none"
                    placeholder="What does your business do?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 rounded-xl bg-white text-primary font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg"
                >
                  <Send size={16} /> Submit listing
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
