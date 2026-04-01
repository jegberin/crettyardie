import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight, ExternalLink, MapPin, GraduationCap, Heart,
  Shield, Users, Activity, Landmark, Mountain, TreePine, Globe,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ───────────────────────────────────────────────────────────────────

interface OrgLink { label: string; href: string; }

interface Org {
  name: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg: string;
  description: string;
  location?: string;
  links: OrgLink[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SCHOOLS: Org[] = [
  {
    name: 'Scoil Naomh Abban',
    subtitle: 'Newtown National School',
    icon: <GraduationCap size={22} />,
    iconBg: 'bg-emerald-100 text-emerald-700',
    description:
      'A three-teacher mainstream primary school in Newtown, Crettyard, listed by the Department of Education and Youth. An important part of everyday family life in the local area.',
    location: 'Newtown, Crettyard, Co. Laois',
    links: [
      { label: 'Website', href: 'http://scoilnaomhabban.weebly.com' },
      { label: 'Facebook', href: 'https://www.facebook.com/p/Newtown-NS-100057254186155/' },
      { label: 'Google Maps', href: 'https://www.google.com/maps/search/?api=1&query=Scoil+Naomh+Abban%2C+Newtown%2C+Crettyard%2C+Co.+Laois' },
    ],
  },
  {
    name: 'Scoil Mhuire Muigheo',
    subtitle: 'Mayo National School',
    icon: <GraduationCap size={22} />,
    iconBg: 'bg-emerald-100 text-emerald-700',
    description:
      'Known locally as Mayo National School, Scoil Mhuire Muigheo serves the Mayo area of Crettyard with both an official school website and an active community Facebook presence.',
    location: 'Mayo, Crettyard, Co. Laois',
    links: [
      { label: 'Website', href: 'http://www.mayons.ie' },
      { label: 'Facebook', href: 'https://www.facebook.com/p/Mayo-National-School-100083211525048/' },
      { label: 'Google Maps', href: 'https://www.google.com/maps/search/?api=1&query=Scoil+Mhuire+Muigheo%2C+Mayo%2C+Crettyard%2C+Co.+Laois' },
    ],
  },
  {
    name: "St. Abban's Childcare",
    subtitle: 'Early Years Service',
    icon: <Heart size={22} />,
    iconBg: 'bg-rose-100 text-rose-700',
    description:
      "Listed at The Parish Centre in Newtown, Crettyard, St. Abban's Childcare gives local families an important early-years option within the community, registered with both Laois County Childcare Committee and the Department of Education.",
    location: 'The Parish Centre, Newtown, Crettyard, Co. Laois',
    links: [
      { label: 'Laois Childcare', href: 'https://www.laoischildcare.ie/directories/st-abbans-childcare/' },
      { label: 'Gov.ie listing', href: 'https://www.gov.ie/en/department-of-education/early-years-services/st-abbans-childcare-the-parish-centre-crettyard-laois/' },
      { label: 'Google Maps', href: 'https://www.google.com/maps/search/?api=1&query=St.+Abbans+Childcare%2C+The+Parish+Centre%2C+Newtown%2C+Crettyard%2C+Co.+Laois' },
    ],
  },
];

const SPORTS: Org[] = [
  {
    name: 'Crettyard CLG',
    subtitle: 'GAA Club',
    icon: <Shield size={22} />,
    iconBg: 'bg-amber-100 text-amber-700',
    description:
      'The local GAA club, based in Newtown, Crettyard, with an active online presence and a dedicated club website. Crettyard CLG brings together hurling and football for all ages across the wider community.',
    location: 'Newtown, Crettyard, Co. Laois',
    links: [
      { label: 'Website', href: 'http://www.crettyardgaa.com' },
      { label: 'Facebook', href: 'https://www.facebook.com/crettyard/' },
      { label: 'Google Maps', href: 'https://www.google.com/maps/search/?api=1&query=Crettyard+CLG%2C+Newtown%2C+Crettyard%2C+Co.+Laois' },
    ],
  },
  {
    name: 'Crettyard Ladies GFC',
    subtitle: "Ladies Gaelic Football Club",
    icon: <Users size={22} />,
    iconBg: 'bg-violet-100 text-violet-700',
    description:
      'Crettyard Ladies GFC caters for players from U6s right through to adult level, providing an active and welcoming club for women and girls in the community. The club has a strong social media presence across both Facebook and Instagram.',
    location: 'Crettyard, Co. Laois',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/crettyard_ladies_gfc/' },
      { label: 'Facebook', href: 'https://www.facebook.com/p/Crettyard-Ladies-Gaelic-Football-Club-100070748090565/' },
      { label: 'Google Maps', href: 'https://www.google.com/maps/search/?api=1&query=Crettyard+Ladies+GFC%2C+Crettyard%2C+Co.+Laois' },
    ],
  },
  {
    name: "St. Abban's AC",
    subtitle: 'Athletics Club',
    icon: <Activity size={22} />,
    iconBg: 'bg-sky-100 text-sky-700',
    description:
      "Based in Monavea, Crettyard, St. Abban's AC is a long-established athletics club with a strong emphasis on coaching, inclusion, and community participation. The club has produced athletes at national level and remains active across all age groups.",
    location: 'Monavea, Crettyard, Co. Laois',
    links: [
      { label: 'Website', href: 'https://stabbansac.ie' },
      { label: 'Facebook', href: 'https://www.facebook.com/StAbbans/' },
      { label: 'Google Maps', href: 'https://www.google.com/maps/search/?api=1&query=St.+Abbans+AC%2C+Monavea%2C+Crettyard%2C+Co.+Laois' },
    ],
  },
];

const HERITAGE_POINTS = [
  {
    title: 'Clonbrock Heritage Museum',
    desc: 'A local heritage reference in Crettyard that gives the area a direct link to preserving and sharing its local story, included among Laois heritage centres.',
  },
  {
    title: 'Clonbrock House / Geneva House',
    desc: 'Associated for generations with the Edge family near Crettyard, this historic house remains part of the area\'s identity and is a recognisable landmark in the townland of Clonbrock.',
  },
  {
    title: 'Killabban Parish Connections',
    desc: 'Crettyard sits within the historic Killabban parish, giving the area deep ecclesiastical and community roots that stretch back through the centuries.',
  },
  {
    title: 'The Castlecomer Coalfield Story',
    desc: 'The old Deerpark and Moscow mines, whose remains are still visible on the landscape, connect Crettyard directly to the broader story of coal mining in the Castlecomer coalfield.',
  },
];

const TRAILS = [
  {
    name: 'Cullahill Mountain',
    icon: <Mountain size={22} />,
    iconBg: 'bg-stone-100 text-stone-700',
    distance: '~10 km',
    description:
      'A scenic walking route beginning at Cullahill village, passing through field paths, forest tracks, lanes, and minor roads. Cullahill Mountain is designated a Special Area of Conservation, adding ecological interest alongside the walking value.',
    links: [
      { label: 'Wikipedia overview', href: 'https://en.wikipedia.org/wiki/Cullahill_Mountain' },
    ],
  },
  {
    name: 'Castlecomer Discovery Park',
    icon: <TreePine size={22} />,
    iconBg: 'bg-green-100 text-green-700',
    distance: '1.6 – 6 km loops',
    description:
      'A short drive from Crettyard, Castlecomer Discovery Park offers three permanent woodland orienteering trails across 80 acres of forest, as well as easy family loop walks described by Trail Kilkenny. A popular day-trip destination for families and groups.',
    links: [
      { label: 'Discovery Park', href: 'https://www.discoverypark.ie/adventure-activities/orienteering-walking-trails-castlecomer/' },
      { label: 'Trail Kilkenny', href: 'https://www.trailkilkenny.ie/activity-trail/walking-trails/castlecomer-loop/' },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function OrgCard({ org, idx }: { org: Org; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (idx % 3) * 0.08 }}
      className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5 transition-all"
    >
      <div className="flex items-start gap-5 mb-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${org.iconBg}`}>
          {org.icon}
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="font-headline text-xl font-bold leading-tight">{org.name}</h3>
          {org.subtitle && (
            <p className="text-xs text-on-surface-variant mt-0.5 font-medium">{org.subtitle}</p>
          )}
        </div>
      </div>

      <p className="text-on-surface-variant text-sm leading-relaxed mb-5 flex-1">{org.description}</p>

      {org.location && (
        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-5">
          <MapPin size={12} className="text-primary shrink-0" />
          <span>{org.location}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-outline-variant/10">
        {org.links.map((lnk) => (
          <a
            key={lnk.href}
            href={lnk.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-xs font-semibold text-on-surface-variant hover:bg-primary hover:text-white transition-colors"
          >
            <ExternalLink size={10} />
            {lnk.label}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function TrailCard({ trail, idx }: { trail: typeof TRAILS[number]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5 transition-all"
    >
      <div className="flex items-start gap-5 mb-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${trail.iconBg}`}>
          {trail.icon}
        </div>
        <div className="flex-1 pt-1">
          <h3 className="font-headline text-xl font-bold leading-tight">{trail.name}</h3>
          <span className="text-xs font-bold text-primary mt-1 inline-block">{trail.distance}</span>
        </div>
      </div>
      <p className="text-on-surface-variant text-sm leading-relaxed mb-5 flex-1">{trail.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-outline-variant/10">
        {trail.links.map((lnk) => (
          <a
            key={lnk.href}
            href={lnk.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-xs font-semibold text-on-surface-variant hover:bg-primary hover:text-white transition-colors"
          >
            <ExternalLink size={10} />
            {lnk.label}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
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
              <span className="text-primary">Community</span>
            </nav>

            <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs mb-4">Crettyard, County Laois</p>
            <h1 className="font-headline text-5xl md:text-8xl font-extrabold text-on-surface tracking-tighter leading-[0.9] mb-8">
              Crettyard <span className="text-primary italic">Community</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-6">
              Crettyard is a rural community with strong local connections, practical family amenities, active sports clubs, and a sense of place shaped by both landscape and local history.
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              For families, new residents, and visitors, the area offers more than a name on the map. Local schools, childcare, sport, heritage, and nearby outdoor destinations all help make Crettyard a well-rooted and livable part of County Laois.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Schools & Childcare ───────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <GraduationCap size={20} />
              </div>
              <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs">Education & Childcare</p>
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">Schools &amp; Childcare</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
              Families in the Crettyard area are supported by two primary schools and a local childcare service that play an important part in everyday community life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SCHOOLS.map((org, idx) => (
              <OrgCard key={org.name} org={org} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sports Clubs ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Shield size={20} />
              </div>
              <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs">Sport & Recreation</p>
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">Sports Clubs</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
              Sport is a big part of community life in Crettyard, with strong local involvement across GAA, ladies football, and athletics from youth to adult level.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPORTS.map((org, idx) => (
              <OrgCard key={org.name} org={org} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Heritage & Local Identity ──────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center">
                <Landmark size={20} />
              </div>
              <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs">Place & History</p>
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">Heritage &amp; Local Identity</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
              Crettyard's community identity is shaped by local heritage, familiar place names, and long-standing local landmarks that connect the present to a deep and layered past.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              From the remains of the Castlecomer coalfield to the historic houses of the Edge family, the area carries its history in the landscape itself. Explore the full story on the History page.
            </p>
            <div className="mt-8">
              <Link
                to="/history-heritage"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                Explore history <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {HERITAGE_POINTS.map((pt, idx) => (
              <motion.div
                key={pt.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10"
              >
                <h3 className="font-headline font-bold text-base mb-2">{pt.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{pt.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Walks & Trails ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                <TreePine size={20} />
              </div>
              <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs">Outdoors & Leisure</p>
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">Walks &amp; Trails</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
              The wider Crettyard area gives easy access to nearby walking routes and outdoor destinations — well suited to families, casual walkers, and visitors exploring the region.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TRAILS.map((trail, idx) => (
              <TrailCard key={trail.name} trail={trail} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto signature-gradient rounded-[2rem] p-12 md:p-20 shadow-2xl text-center"
        >
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-6 tracking-tighter text-on-primary">
            Something missing?
          </h2>
          <p className="text-lg opacity-90 leading-relaxed mb-4 text-on-primary max-w-2xl mx-auto">
            If your club, school, or community group is not listed here, or if you have updated information to share, we'd love to hear from you. Crettyard.ie grows with the community.
          </p>
          <p className="text-base opacity-75 leading-relaxed mb-10 text-on-primary">
            Submissions are welcome for events, updates, local news, and new additions to any section of the site.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-primary font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
          >
            Get in touch <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
