import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Globe, MapPin, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Link_ {
  label: string;
  href: string;
}

interface Business {
  name: string;
  tradingAs?: string;
  sector: string;
  sectorColor: string;
  description: string;
  logo?: string;          // Clearbit or direct URL
  initials: string;       // fallback
  links: Link_[];
  location?: string;
}

// ─── Business data ────────────────────────────────────────────────────────────

const CONFIRMED: Business[] = [
  {
    name: 'Inver Geneva Stores',
    sector: 'Fuel & Convenience',
    sectorColor: 'bg-blue-100 text-blue-800',
    description:
      'Fuel, convenience shop, deli, car wash and more at the Crettyard junction. Inver Geneva Stores is a landmark local service point on the N78, serving both residents and passing trade.',
    logo: 'https://logo.clearbit.com/inverenergy.ie',
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
      'The Tirlán FarmLife branch at Crettyard supports farming life in the area with a full range of agricultural inputs, hardware, feed, animal health products and farm supplies.',
    logo: 'https://logo.clearbit.com/tirlanfarmlife.com',
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
      'A specialist supplier of natural building stone including sandstone, granite, paving and walling products. Crettyard Stone serves builders, architects and homeowners across Leinster and beyond.',
    logo: 'https://logo.clearbit.com/crettyardstone.ie',
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
      'A. Wilson Engineering Ltd is a long-established agricultural engineering firm on the Carlow Road in Crettyard, best known for the Super Move range of machinery and engineering work for farming customers.',
    logo: 'https://logo.clearbit.com/wilsonengineering.ie',
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
    logo: 'https://logo.clearbit.com/mastermygarden.com',
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
      "Established in 1990 by Sandro Cafolla in Monavea, Crettyard, Design By Nature is Ireland's leading specialist in native wildflower seed production and biodiversity-focused growing, supplying seeds for rewilding and meadow restoration across Ireland.",
    logo: 'https://logo.clearbit.com/wildflowers.ie',
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
      'A local sports rehabilitation and performance practice serving the Crettyard area. Specialising in injury assessment, rehabilitation, and conditioning support for athletes and active individuals.',
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
      'A local web design and digital services business providing website development, digital marketing, and IT support for trades, retailers and small businesses in the Laois area.',
    initials: 'CD',
    location: 'Crettyard, Co. Laois',
    links: [
      { label: 'Facebook', href: 'https://www.facebook.com/crettyarddigital' },
      { label: 'Instagram', href: 'https://www.instagram.com/crettyarddigital' },
    ],
  },
  {
    name: 'Mayo-Doonane Credit Union',
    sector: 'Financial Services',
    sectorColor: 'bg-teal-100 text-teal-800',
    description:
      'Serving members in the Mayo and Doonane area of County Laois, Mayo-Doonane Credit Union provides savings, loans and financial services to the local rural community.',
    initials: 'MDCU',
    location: 'Doonane, Crettyard',
    links: [],
  },
  {
    name: 'Clonbrock Heritage Centre',
    sector: 'Heritage & Tourism',
    sectorColor: 'bg-amber-100 text-amber-800',
    description:
      'Clonbrock Heritage Centre in Crettyard is listed as a local heritage attraction by Laois Tourism, preserving and sharing the story of the Clonbrock estate and its place in the wider local history.',
    initials: 'CHC',
    location: 'Clonbrock, Crettyard',
    links: [
      { label: 'Laois Tourism', href: 'https://laois.ie/heritage-and-conservation/heritage/heritage-centres' },
    ],
  },
];

const LIMITED: Business[] = [
  {
    name: "Behan's Pub",
    sector: 'Pub & Social Venue',
    sectorColor: 'bg-red-100 text-red-800',
    description: 'A local country pub near Newtown and Turra Hill, serving the Crettyard community.',
    initials: 'BP',
    links: [],
  },
  {
    name: 'Galtee Fuels',
    tradingAs: 'Newtown Cross',
    sector: 'Fuel Merchant',
    sectorColor: 'bg-blue-100 text-blue-800',
    description: 'Fuel merchant and coal supplier at Newtown Cross. Current trading status should be confirmed locally.',
    initials: 'GF',
    links: [],
  },
  {
    name: 'Blue Equipment (Ireland) Ltd',
    sector: 'Machinery & Plant',
    sectorColor: 'bg-indigo-100 text-indigo-800',
    description: 'Plant machinery and equipment, listed with a Crettyard-area address at Fairymount.',
    initials: 'BE',
    links: [
      { label: 'Blue Group', href: 'https://www.blue-group.co.uk' },
    ],
  },
  {
    name: 'McDonald Concrete Flooring Ltd',
    sector: 'Concrete & Construction',
    sectorColor: 'bg-slate-100 text-slate-700',
    description: 'Concrete flooring and construction contractor based at a Crettyard address.',
    initials: 'MCF',
    links: [],
  },
  {
    name: 'Leinster Retrofit Ltd',
    sector: 'Retrofit & Installation',
    sectorColor: 'bg-lime-100 text-lime-800',
    description: 'Retrofit and energy installation services, registered with a Crettyard address.',
    initials: 'LR',
    links: [],
  },
  {
    name: 'D&B Civil Engineering Ltd',
    sector: 'Civil Engineering',
    sectorColor: 'bg-orange-100 text-orange-800',
    description: 'Civil engineering contractor with a Crettyard address in company registration records.',
    initials: 'DB',
    links: [],
  },
  {
    name: 'K1-A Project Management Ltd',
    sector: 'Project Management',
    sectorColor: 'bg-violet-100 text-violet-800',
    description: 'Project management and construction services, linked to the Crettyard area in company records.',
    initials: 'K1A',
    links: [],
  },
  {
    name: 'Problast Ltd',
    sector: 'Surface Preparation',
    sectorColor: 'bg-zinc-100 text-zinc-700',
    description: 'Surface preparation and industrial blasting, listed with a Crettyard-area address.',
    initials: 'PB',
    links: [],
  },
  {
    name: 'Under a Cover Ltd',
    sector: 'Construction & Coverings',
    sectorColor: 'bg-cyan-100 text-cyan-800',
    description: 'Construction and coverings contractor included in company registration records for the area.',
    initials: 'UAC',
    links: [],
  },
  {
    name: 'Farnans Pigs Ltd',
    sector: 'Agriculture',
    sectorColor: 'bg-pink-100 text-pink-800',
    description: 'An active agricultural business in the Crettyard area, specialising in pig farming.',
    initials: 'FP',
    links: [],
  },
  {
    name: 'Holistic Hair & Beauty',
    sector: 'Health & Beauty',
    sectorColor: 'bg-rose-100 text-rose-800',
    description: 'A local hair and beauty business in the area. Exact web presence and current trading details need local confirmation.',
    initials: 'HHB',
    links: [],
  },
];

// ─── Logo component with graceful fallback ────────────────────────────────────

function BusinessLogo({ logo, initials, name }: { logo?: string; initials: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt={`${name} logo`}
        className="w-12 h-12 object-contain rounded-xl"
        onError={() => setFailed(true)}
      />
    );
  }

  // Initials fallback
  return (
    <div className="w-12 h-12 rounded-xl signature-gradient flex items-center justify-center">
      <span className="text-white font-extrabold text-xs tracking-wide">{initials}</span>
    </div>
  );
}

// ─── Confirmed business card ──────────────────────────────────────────────────

function ConfirmedCard({ biz, idx }: { biz: Business; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06 }}
      className="group bg-surface-container-lowest rounded-3xl border border-outline-variant/10 p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5 transition-all"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <BusinessLogo logo={biz.logo} initials={biz.initials} name={biz.name} />
        <div className="flex-1 min-w-0">
          <h3 className="font-headline text-xl font-bold leading-tight">{biz.name}</h3>
          {biz.tradingAs && (
            <p className="text-xs text-on-surface-variant mt-0.5">{biz.tradingAs}</p>
          )}
        </div>
      </div>

      {/* Sector badge */}
      <span className={`inline-block self-start text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 ${biz.sectorColor}`}>
        {biz.sector}
      </span>

      {/* Description */}
      <p className="text-on-surface-variant text-sm leading-relaxed flex-grow mb-6">{biz.description}</p>

      {/* Location */}
      {biz.location && (
        <p className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-5">
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
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface-container text-xs font-semibold text-on-surface-variant hover:bg-primary hover:text-white transition-all"
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

// ─── Limited-presence row ─────────────────────────────────────────────────────

function LimitedRow({ biz, idx }: { biz: Business; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 border-b border-outline-variant/10 last:border-0"
    >
      <div className="w-10 h-10 rounded-xl signature-gradient flex items-center justify-center shrink-0">
        <span className="text-white font-extrabold text-[10px] tracking-wide">{biz.initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <span className="font-bold text-on-surface">{biz.name}</span>
          {biz.tradingAs && <span className="text-xs text-on-surface-variant">({biz.tradingAs})</span>}
          <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${biz.sectorColor}`}>
            {biz.sector}
          </span>
        </div>
        <p className="text-sm text-on-surface-variant leading-relaxed">{biz.description}</p>
      </div>
      {biz.links.length > 0 && (
        <div className="flex gap-2 shrink-0">
          {biz.links.map((lk) => (
            <a
              key={lk.href}
              href={lk.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-on-surface-variant hover:bg-primary hover:text-white transition-all"
            >
              <Globe size={10} /> {lk.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessesPage() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? LIMITED : LIMITED.slice(0, 6);

  return (
    <main>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ArrowRight size={12} />
                <span className="text-primary">Businesses</span>
              </nav>

              <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs mb-4">Crettyard, County Laois</p>
              <h1 className="font-headline text-5xl md:text-8xl font-extrabold text-on-surface tracking-tighter leading-[0.9] mb-8">
                Crettyard <span className="text-primary italic">Businesses</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl mb-8">
                Crettyard and its surrounding townlands support a varied local economy shaped by farming, practical services, skilled trades, specialist manufacturing, and small independent enterprise. The area works as a rural network of junction services, workshops, suppliers, growers, contractors and specialist businesses serving local people and customers further afield.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl">
                This page brings together local businesses based in Crettyard and the immediate area — from retail, fuel and agricultural supply to building trades, engineering, stone, digital services, gardening and heritage.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-4 flex flex-col justify-center gap-6"
            >
              {[
                { n: CONFIRMED.length, label: 'Confirmed listings' },
                { n: LIMITED.length, label: 'Further local businesses' },
                { n: CONFIRMED.length + LIMITED.length, label: 'Total directory entries' },
              ].map((s) => (
                <div key={s.label} className="p-6 rounded-2xl bg-surface-container border border-outline-variant/10">
                  <p className="font-headline text-4xl font-extrabold text-primary mb-1">{s.n}</p>
                  <p className="text-sm text-on-surface-variant font-medium">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Supporting enterprise ───────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-surface">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-headline text-2xl font-extrabold tracking-tight mb-4">Supporting local enterprise</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              One of Crettyard's strengths is the range of enterprise packed into a small rural area. Alongside practical day-to-day services at the junction, the locality also includes businesses in wildflower production, agricultural engineering, stone supply, machinery, retrofit, web services and heritage tourism — giving the area a broader economic story than many might expect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Confirmed listings ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Confirmed listings</span>
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Businesses with a public web presence
            </h2>
            <p className="text-on-surface-variant text-lg max-w-3xl">
              These businesses have a verified website, social page, or established public listing. Logos and links are pulled directly from their official channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CONFIRMED.map((biz, idx) => (
              <ConfirmedCard key={biz.name} biz={biz} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Limited presence ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Further local businesses</span>
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Locally identified businesses
            </h2>
            <p className="text-on-surface-variant text-lg max-w-3xl">
              These businesses have been identified through local records, company registration or community knowledge, but have limited or unconfirmed public web presence. Business owners are welcome to submit updates, logos and correct details using the form below.
            </p>
          </motion.div>

          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 divide-y divide-outline-variant/10 px-6 md:px-10">
            {visible.map((biz, idx) => (
              <LimitedRow key={biz.name} biz={biz} idx={idx} />
            ))}
          </div>

          {LIMITED.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-primary text-primary font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
              >
                {showAll ? (
                  <><ChevronUp size={16} /> Show fewer</>
                ) : (
                  <><ChevronDown size={16} /> Show all {LIMITED.length} businesses</>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Submission CTA ──────────────────────────────────────────────────── */}
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
                This directory is built with local knowledge and grows over time. If your business is not listed, or if you have updated contact details, a new logo, a corrected description or different links to share, we would love to hear from you.
              </p>
              <p className="text-base opacity-75 leading-relaxed">
                Business owners can also submit opening hours, photos, and a short description for a more complete listing. There is no charge to be included in this directory.
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
