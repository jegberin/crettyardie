import React from 'react';
import {
  History,
  Store,
  Users,
  MessageSquare,
  ArrowRight,
  MapPin,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { getLinkIcon } from '../components/BrandLinkIcons';

const Hero = () => (
  <section className="relative px-6 md:px-12 py-16 md:py-32 max-w-screen-2xl mx-auto overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-6 z-10"
      >
        <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs mb-4">County Laois | History, community and local life</p>
        <h1 className="font-headline text-5xl md:text-8xl font-extrabold text-on-surface tracking-tighter leading-[0.9] mb-8">
          Welcome to <span className="text-primary italic">Crettyard</span>
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-10 max-w-xl">
          Crettyard is a place of strong community spirit on the eastern edge of the Castlecomer Plateau, where the Laois countryside meets the routes and traditions of nearby Kilkenny and Carlow. Set around the N78 and R431 junction, it is an area shaped by generations of farming, mining heritage, local enterprise, schools, sport and parish life.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/history-heritage" className="px-8 py-4 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-primary/20">
            Explore History
          </Link>
          <Link to="/businesses" className="px-8 py-4 rounded-full bg-surface-container-high text-primary font-bold text-sm uppercase tracking-widest hover:bg-secondary-container transition-colors">
            Local Businesses
          </Link>
        </div>
        <div className="mt-10 flex gap-8 text-sm font-semibold text-secondary">
          <Link to="/community" className="flex items-center gap-2 hover:text-primary transition-colors group">
            <Users size={18} className="text-primary group-hover:scale-110 transition-transform" />
            Community
          </Link>
          <Link to="/noticeboard" className="flex items-center gap-2 hover:text-primary transition-colors group">
            <MessageSquare size={18} className="text-primary group-hover:scale-110 transition-transform" />
            Notice Board
          </Link>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="lg:col-span-6 relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
      >
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/crettyard-signpost.jpg"
          alt="Crettyard / Crochta Ard signpost in the County Laois countryside"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </motion.div>
    </div>
  </section>
);

const Intro = () => (
  <section className="bg-surface-container-low py-24 md:py-32">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface mb-8 tracking-tight"
      >
        Discover Crettyard
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-xl md:text-2xl text-on-surface-variant leading-[1.8] font-medium"
      >
        Crettyard is more than a point on the map. It is a living rural community with deep roots in the old Killabban parish, a proud connection to the Castlecomer coalfield story, and a modern identity built around family life, local clubs, small businesses, and a strong sense of place. Whether you live nearby, have family connections here, or are passing through the area, this website is designed to help you explore what makes Crettyard special.
      </motion.p>
    </div>
  </section>
);

const ExploreGrid = () => {
  const items = [
    {
      title: 'History & Heritage',
      icon: History,
      desc: 'Discover the story of early settlement, parish life, coal mining, Newtown and Doonane, holy wells, churches, bridges and the wider heritage of the Crettyard area.',
      link: 'Read More',
      href: '/history-heritage',
    },
    {
      title: 'Businesses & Services',
      icon: Store,
      desc: 'Find local shops, fuel, farm supplies, trades, engineering, stone, digital services, hospitality and other businesses serving Crettyard and the surrounding townlands.',
      link: 'Directory',
      href: '/businesses',
    },
    {
      title: 'Community & Clubs',
      icon: Users,
      desc: 'Learn about the schools, childcare, sports clubs and community organisations that support everyday life in Crettyard — from GAA and soccer to athletics and parish life.',
      link: 'Explore',
      href: '/community',
    },
    {
      title: 'Notice Board',
      icon: MessageSquare,
      desc: 'Read community announcements, local news and updates from Crettyard and the surrounding area. Log in to post your own announcements.',
      link: 'View Board',
      href: '/noticeboard',
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Explore the Area</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group p-10 rounded-3xl bg-surface-container-lowest transition-all hover:shadow-2xl hover:shadow-primary/5 flex flex-col h-full border border-outline-variant/10"
          >
            <item.icon className="text-primary size-10 mb-8" />
            <h3 className="font-headline text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-on-surface-variant mb-8 flex-grow leading-relaxed">{item.desc}</p>
            <Link to={item.href} className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
              {item.link} <ArrowRight size={16} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SponsoredPill = () => (
  <div className="flex justify-center mb-3">
    <motion.div
      animate={{ boxShadow: ['0 0 8px 2px #fbbf24aa', '0 0 22px 6px #f59e0bcc', '0 0 8px 2px #fbbf24aa'] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        background: 'linear-gradient(90deg, #92400e 0%, #b45309 20%, #fbbf24 45%, #fde68a 55%, #d97706 80%, #92400e 100%)',
        backgroundSize: '200% 100%',
      }}
      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full"
    >
      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        style={{
          background: 'linear-gradient(90deg, #92400e 0%, #fbbf24 40%, #fde68a 55%, #d97706 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      />
      <Sparkles size={11} className="text-amber-900" strokeWidth={2.5} />
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-900">Sponsored</span>
      <Sparkles size={11} className="text-amber-900" strokeWidth={2.5} />
    </motion.div>
  </div>
);

const SponsoredCard = ({ biz }: { biz: { name: string; desc: string; logo: string; links: { label: string; href: string }[] } }) => (
  <div className="relative flex flex-col">
    <SponsoredPill />
    <div className="relative flex-1">
      {/* Deep pulsing aura behind card */}
      <motion.div
        animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.04, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-3 rounded-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, #fbbf24 0%, #f59e0b88 45%, transparent 75%)',
          filter: 'blur(14px)',
          zIndex: 0,
        }}
      />

      {/* Rotating conic-gradient border ring */}
      <div className="absolute -inset-[2px] rounded-3xl overflow-hidden" style={{ zIndex: 1 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute"
          style={{
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%',
            background: 'conic-gradient(from 0deg, #92400e 0%, #fbbf24 20%, #fde68a 30%, #f59e0b 45%, #fff7ed 50%, #f59e0b 55%, #fde68a 70%, #fbbf24 80%, #92400e 100%)',
          }}
        />
      </div>

      {/* Card surface */}
      <div className="relative bg-surface-container-lowest rounded-3xl overflow-hidden flex flex-col group" style={{ zIndex: 2 }}>
        <div className="h-40 flex items-center justify-center p-6 bg-white border-b border-amber-100">
          <img
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            src={biz.logo}
            alt={biz.name}
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h4 className="font-bold text-lg mb-2">{biz.name}</h4>
          <p className="text-sm text-on-surface-variant leading-relaxed flex-1">{biz.desc}</p>
          {biz.links.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-amber-100">
              {biz.links.map((lk) => (
                <a
                  key={lk.href}
                  href={lk.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-xs font-semibold text-amber-900 hover:bg-amber-200 transition-all"
                >
                  {getLinkIcon(lk.label, lk.href)}
                  {lk.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const FeaturedBusinesses = () => {
  const businesses = [
    {
      name: 'Inver Geneva Stores',
      desc: 'Fuel, convenience shop, deli and car wash at the Crettyard junction on the N78. A landmark local service point serving residents and passing trade daily.',
      logo: '/logos/inver.svg',
      sponsored: false,
      links: [
        { label: 'Website', href: 'https://inverenergy.ie/blog/station/inver-geneva-stores/' },
        { label: 'Facebook', href: 'https://www.facebook.com/invergeneva' },
      ],
    },
    {
      name: 'Crettyard Digital',
      desc: 'Web design and digital services for local businesses — websites, digital marketing and IT support for trades and retailers across the Laois area.',
      logo: '/logos/crettyarddigital.png',
      sponsored: true,
      links: [
        { label: 'Website', href: 'https://digital.crettyard.ie' },
        { label: 'Facebook', href: 'https://www.facebook.com/crettyarddigital' },
        { label: 'Instagram', href: 'https://www.instagram.com/crettyarddigital' },
      ],
    },
    {
      name: 'Wilson Engineering',
      desc: 'Agricultural and machinery engineering — home of the Super Move. Specialists in bespoke engineering for farm and industry based in the Crettyard area.',
      logo: '/logos/wilson.png',
      sponsored: false,
      links: [
        { label: 'Website', href: 'https://www.wilsonengineering.ie/' },
        { label: 'Facebook', href: 'https://www.facebook.com/p/Wilson-Engineering-100057660361297/' },
      ],
    },
    {
      name: 'Crettyard Stone',
      desc: 'Natural building materials including sandstone, granite, paving and walling products for residential and commercial projects.',
      logo: '/logos/crettyardstone.jpg',
      sponsored: false,
      links: [
        { label: 'Website', href: 'https://www.crettyardstone.ie/' },
        { label: 'Facebook', href: 'https://www.facebook.com/crettyardstone' },
      ],
    },
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-headline text-4xl font-extrabold mb-4 tracking-tight">Local Businesses</h2>
            <p className="text-on-surface-variant text-lg">Crettyard has a diverse rural economy, with practical local services at the junction and a wider network of businesses across the surrounding area. From farm supply and natural stone to wildflower production and digital services, local enterprise remains a major part of the area's identity today.</p>
          </div>
          <div className="flex flex-col items-stretch md:items-end gap-3">
            <Link
              to="/contact?category=advertise"
              className="px-8 py-3 rounded-full signature-gradient text-white font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all whitespace-nowrap text-center shadow-lg shadow-primary/20"
            >
              Feature my business here
            </Link>
            <Link to="/businesses" className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all whitespace-nowrap text-center">
              Browse the directory
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {businesses.map((biz, idx) => (
            biz.sponsored ? (
              <motion.div
                key={biz.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <SponsoredCard biz={biz} />
              </motion.div>
            ) : (
              <motion.div
                key={biz.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="h-40 flex items-center justify-center p-6 bg-white border-b border-outline-variant/10">
                  <img
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    src={biz.logo}
                    alt={biz.name}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="font-bold text-lg mb-2">{biz.name}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed flex-1">{biz.desc}</p>
                  {biz.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-outline-variant/10">
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
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

const CommunitySection = () => (
  <section className="py-24 overflow-hidden">
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700">
            <img
              className="w-full h-[500px] md:h-[700px] object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMNXg9zTrydQ4lAjWvf70NckFZYNTgpVl04ao3ZhSD_MzPl9RXYV9lMowvwdlMXBh1m3hHGCv2Uabfsn6elk2VMfuq75m3NP8KnOmp9VQU9a9wn4GJn0-tbl1PB_smYKKOIbIHFFF_na-8kXx72vSTdmTxxzKD_iJh2TeVisGNvW1PiMdO113bOExNOt3q1hvmWLJPUDgO9pVfwPA0Gl4aPHOMrPlhvNCjMh-sMGkDbCkm1hAVZ0PfZ3-xro5UOw997RL8exldKc3U"
              alt="Local sports grounds in Crettyard area"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
        <div className="order-1 lg:order-2 space-y-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Community Life</h2>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed">Community life in Crettyard is supported by schools, childcare, parish connections, local volunteers and a remarkably strong sporting culture. Newtown National School, Mayo National School, local childcare provision, Crettyard GAA, Crettyard United and St. Abban's Athletic Club all help make the area active, connected and family-focused.</p>
            <Link to="/community" className="mt-10 inline-block text-primary font-black uppercase text-sm tracking-[0.2em] underline underline-offset-[12px] decoration-2 decoration-primary/30 hover:decoration-primary transition-all">
              Explore community
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Notice Board</h2>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed">Stay up to date with local announcements, community news and area updates on the Crettyard Notice Board. Anyone can read; create a free account to post your own announcements for the community.</p>
            <Link to="/noticeboard" className="mt-10 inline-block text-primary font-black uppercase text-sm tracking-[0.2em] underline underline-offset-[12px] decoration-2 decoration-primary/30 hover:decoration-primary transition-all">
              Read announcements
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const FindUs = () => (
  <section className="py-24 bg-surface-container">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-5">
        <h2 className="font-headline text-4xl font-extrabold mb-8 tracking-tight">Find Crettyard</h2>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
          Crettyard sits at the junction of the N78 and R431, giving it direct road links and practical access to nearby towns including Kilkenny, Carlow and Athy. That location has long made it an important local meeting point and service centre for the surrounding rural area.
        </p>
        <a
          href="https://maps.google.com/?q=Crettyard,+Co.+Laois,+Ireland"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-widest inline-flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
        >
          <Navigation size={20} /> View map and directions
        </a>
      </div>
      <div className="lg:col-span-7 h-[450px] rounded-3xl overflow-hidden shadow-inner bg-surface-container-high relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-full h-full grayscale opacity-40"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDm9hdEhq8emyM2AT4IMBq5MNB9jhh00VBXtZ0MN_2EnvzwpjlIRNTnKg2eVQHoATb1A-xkTbn3uZttAyWCq2PX0SEvz6gi8FJt3_OIVEjusv0uThoqVDB3hXZSsBANm_kydPGgO7aJabCg0zYFZVz3ay4iILhwLE_FNopBMXAqg0RMTAUnI2ymKfoZNRSpT0xqD3EWBBbEXz8fdxwZvJfz-do_-bDbWPhB5o1bKAJQAheIAE2QV46vOIOcl4o_v8UukIIeSosDFUAF')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute flex flex-col items-center">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <MapPin className="text-primary size-16 fill-primary/20" />
            </motion.div>
            <span className="bg-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm mt-4 border border-surface-container">
              Crettyard, Co. Laois
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-24 px-6 md:px-12">
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto signature-gradient rounded-[2rem] p-12 md:p-24 text-center text-on-primary shadow-2xl relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-lu09dTxVhx8T7tz9r1Hx3T9ZFv5frDLuX7syV2lYIbKnH0YHF63ZWxNkfD9Kda1H5rQpLMcF_cB00VmDuKPCHA3m4yHGyYzpCfwPSWRAiVQtvWWW3kY6E91QwA2Jf8-0vk2hEatxNlsn4Gq5x5iInP9EBuRjcvDa61RSs4jhdi-Hvm0OoSo8OyXnjwauvufqqPgxfxAcYZNfybHEqeHGbLspNMkVaRQc8C-tJ5lXEv8OV2HEGl68fa7HZ2oqRSTeNCJV0lgArSWG')`,
          backgroundSize: 'cover'
        }}
      ></div>
      <div className="relative z-10">
        <h2 className="font-headline text-4xl md:text-7xl font-extrabold mb-8 tracking-tighter">Be Part of the Story</h2>
        <p className="text-lg md:text-2xl opacity-90 max-w-3xl mx-auto mb-16 leading-relaxed">
          This website is here to celebrate Crettyard's past and present, and to help share its stories with residents, visitors, families and the wider diaspora. Explore the area, support local businesses, and help us build a stronger picture of Crettyard by sharing events, photos, memories and updates.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/noticeboard" className="px-10 py-5 rounded-full bg-white text-primary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
            Post an Announcement
          </Link>
          <Link to="/businesses" className="px-10 py-5 rounded-full border-2 border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors">
            Join the Directory
          </Link>
        </div>
      </div>
    </motion.div>
  </section>
);

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <ExploreGrid />
      <FeaturedBusinesses />
      <CommunitySection />
      <FindUs />
      <CTA />
    </main>
  );
}
