/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  History, 
  Store, 
  School, 
  Trophy, 
  Calendar, 
  Map as MapIcon, 
  ArrowRight, 
  CalendarDays, 
  Compass, 
  Send,
  MapPin,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'History', href: '#' },
    { name: 'Businesses', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'What\'s On', href: '#' },
    { name: 'Visit', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="text-2xl font-black tracking-tighter text-primary font-headline">Crettyard.ie</div>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className={`font-headline tracking-tight text-sm uppercase font-bold transition-colors ${
                link.name === 'Home' ? 'text-primary border-b-2 border-primary/20 pb-1' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:block px-6 py-2 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/10 hover:scale-105 transition-transform">
            Contact
          </button>
          <button className="md:hidden p-2 text-primary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl p-6 flex flex-col gap-4 border-t border-surface-container"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="font-headline text-lg font-bold text-on-surface"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full py-3 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider mt-4">
              Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

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
          <button className="px-8 py-4 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-primary/20">
            Explore History
          </button>
          <button className="px-8 py-4 rounded-full bg-surface-container-high text-primary font-bold text-sm uppercase tracking-widest hover:bg-secondary-container transition-colors">
            Local Businesses
          </button>
        </div>
        <div className="mt-10 flex gap-8 text-sm font-semibold text-secondary">
          <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors group">
            <CalendarDays size={18} className="text-primary group-hover:scale-110 transition-transform" /> 
            What's On
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors group">
            <Compass size={18} className="text-primary group-hover:scale-110 transition-transform" /> 
            Plan Your Visit
          </a>
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
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7ijjBJvGKl5oGiue-1xgESQ-9D9FvQowd7RucJV22kNZb-lYrHJrBknTnnzdono1HV2aytGvPnAVVQ-m3QyOhtDEuaIwuAG4on4073CTyhmCdXqW_COMuGUN4tq1n1RCfJakRjOjFXF2vig_FH8ZfADBbhBtv4AxveMfbzyjqPMHyXy9H-sbCS_vb6Cp-X53jmYNQnh3I_aYcFLD66J7m7hrNkiqut-TQ4riIZRl5Ee4y-KNykTAlcbduk1QIIeBnHFAmAtl5mY7L" 
          alt="Crettyard heritage landscape on the Castlecomer Plateau"
          referrerPolicy="no-referrer"
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
      link: 'Read More' 
    },
    { 
      title: 'Businesses & Services', 
      icon: Store, 
      desc: 'Find local shops, fuel, farm supplies, trades, engineering, stone, digital services, hospitality and other businesses serving Crettyard and the surrounding townlands.', 
      link: 'Directory' 
    },
    { 
      title: 'Schools & Childcare', 
      icon: School, 
      desc: 'Learn about the local schools and childcare services that support everyday family life in the area.', 
      link: 'Education' 
    },
    { 
      title: 'Sport & Clubs', 
      icon: Trophy, 
      desc: 'Explore the clubs and facilities that give Crettyard its strong sporting identity, from athletics and Gaelic games to soccer and community events.', 
      link: 'Join a Club' 
    },
    { 
      title: 'Events & What\'s On', 
      icon: Calendar, 
      desc: 'Keep up with local races, club fixtures, school events, seasonal activities and community happenings across the year.', 
      link: 'Calendar' 
    },
    { 
      title: 'Visit Crettyard', 
      icon: MapIcon, 
      desc: 'Plan a stop in Crettyard and use it as a base to explore heritage, nearby villages, local businesses and the wider Laois, Kilkenny and Carlow border area.', 
      link: 'Plan Trip' 
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <a href="#" className="text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
              {item.link} <ArrowRight size={16} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const FeaturedBusinesses = () => {
  const businesses = [
    { 
      name: 'Design By Nature', 
      desc: 'Based in Monavea, this specialist business has become known for native Irish wildflower seeds and biodiversity-focused growing.', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEeQirM9xql3kf8ra2kwsDE2zOaV21-fYAzhRW8RA8KGG3TB4lwt1Imt31fg5l-s_Qoez0_2rpdCVCgsa5d5lWf4A2dVMQzaWoPNiNaYp_74pe200rx1jUMfFDj7okKb25eMKaDpJzPc4zUZ7f85jSvUJ4WT8mCrGlqCdl-Hzc6jH6U9TDEo4RjX_VbUiS0Aj1ixUFxWLJgffQU6hhA7b1s4fCTXL6vw65C_0-RJ_wOoSLJrEoJcPNJkd0CWpqk5kjNar6AAyZ1Cq_' 
    },
    { 
      name: 'Crettyard Stone', 
      desc: 'Crettyard Stone supplies natural building materials including sandstone, granite, paving and walling products.', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDomtkaPHGu_j9Dpzzdf7m12M6uTeG6wQbP75UnJhjn0iryeQbGUhIi_GqhbSxf1B48iguaTjvJWueOMt5BUJDs_zZHUR4mI2yAhXpATFgzeXUAf5OZEsgfycz68fklfHLGk326aH_QluhkK3dJ5Ak6Wp2gmlkH2Ac1gcv36fzaDzjAY_wY8unAJv_YEtcbM0Wvn6b5cXtQyK3uNHkavCf10MBmStJ2BvbU5-2656okPYYi9JwqMcWCmXoEhA5WGhAwBnLoG4FSnYEB' 
    },
    { 
      name: 'Tirlán FarmLife Crettyard', 
      desc: 'The local branch at the Crettyard junction supports farming life with essential agricultural supplies and hardware.', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmAvjawbhmi7RpGEUbZtsxZweuzdy1IMP5HMWZXFuwavRPUKYHS8ue2CCt-YEMRbXARsDMfQLZ4IrYFhLS-AAWzZ5wtts0kTWFWitKTRibsXnJ24kGzTXiNPG2ll9AlezQEZseoFKYLov7vGwJXvlfNa82A7AuyJICkVu7G-ReKDQMAwPGRNXeg0AzipeyWX32v6FazS8iSOL_HrdC66BPEKz8c2XbbMNWw-PwgW1f5BkuSZ88J2FkG12eGHH_20dYHHSeins54cH1' 
    },
    { 
      name: 'Crettyard Digital', 
      desc: 'The area is also home to digital and web services that help local businesses compete online.', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB9L8FEMHhsvhKdvlvaASuYxwNN41-q_MgGdF3B853ClZxqgGKzJuBOX0oz9HVJ92aI3zZ4DEbQpgMA1ywgbqmtPmbQiGqO_2JMVNQNbKXFXKnhkdHeqm-uMVn5YhMdURSu363NU-Vq_vPx5yst997ibW3ZHAYvr5rspWvCpYzbmEvZ8S9BPZOQP7MT4mXH5VsOf9LoURGHqLq5WaO7uvw_wEHy0BXSZKTI2b3Ick-tZd87ShGSGkBuTu7vX5y9yOIyaKn-U0O77nV' 
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
          <a href="#" className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all whitespace-nowrap">
            Browse the business directory
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {businesses.map((biz, idx) => (
            <motion.div 
              key={biz.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={biz.img} 
                  alt={biz.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h4 className="font-bold text-xl mb-3">{biz.name}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{biz.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CommunityEvents = () => (
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Community Life</h2>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed">Community life in Crettyard is supported by schools, childcare, parish connections, local volunteers and a remarkably strong sporting culture. Newtown National School, Mayo National School, local childcare provision, Crettyard GAA, Crettyard United and St. Abban's Athletic Club all help make the area active, connected and family-focused.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">What's On</h2>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed">Throughout the year, the Crettyard area hosts and supports a range of events linked to athletics, club life, schools, parish activities and seasonal gatherings. From open sports and local fixtures to jiving nights, school events and community celebrations, there is always something happening in and around the area.</p>
            <button className="mt-10 text-primary font-black uppercase text-sm tracking-[0.2em] underline underline-offset-[12px] decoration-2 decoration-primary/30 hover:decoration-primary transition-all">
              View full calendar
            </button>
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
        <button className="px-8 py-4 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
          <Navigation size={20} /> View map and directions
        </button>
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
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
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

const LatestUpdates = () => {
  const updates = [
    { cat: 'Community News', date: 'Oct 12', title: 'Parish Hall Renovation Project Begins', desc: 'Exciting updates on the local community hall as phase one of the structural repairs gets underway this week...' },
    { cat: 'Sport', date: 'Oct 10', title: 'Crettyard United Secure Historic Win', desc: 'A hard-fought match at the weekend sees the senior team advance to the next round of the cup competition...' },
    { cat: 'History', date: 'Oct 05', title: 'Unearthing the Mining Archives', desc: 'A new digital collection of photographs from the old Deerpark Colliery has been donated to the local archive...' },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Latest Updates</h2>
          <p className="text-on-surface-variant text-lg max-w-xl">Follow local news, event announcements, new business additions, heritage stories and community updates from across the Crettyard area.</p>
        </div>
        <a href="#" className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all whitespace-nowrap">
          Read the latest news
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {updates.map((upd, idx) => (
          <motion.div 
            key={upd.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="h-1 w-12 bg-primary mb-8 transition-all group-hover:w-24"></div>
            <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">{upd.cat} • {upd.date}</p>
            <h3 className="font-headline text-2xl font-bold mb-5 group-hover:text-primary transition-colors leading-tight">{upd.title}</h3>
            <p className="text-on-surface-variant line-clamp-3 leading-relaxed">{upd.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

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
          <button className="px-10 py-5 rounded-full bg-white text-primary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
            Submit an Update
          </button>
          <button className="px-10 py-5 rounded-full border-2 border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors">
            Join the Directory
          </button>
        </div>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="bg-surface-container-lowest w-full py-24 border-t border-outline-variant/20">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 md:col-span-1">
          <div className="text-2xl font-black text-primary mb-8 font-headline tracking-tighter">Crettyard.ie</div>
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-xs">
            History, community and local life in the heart of County Laois.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-8 text-xs uppercase tracking-[0.2em]">Explore</h4>
          <ul className="space-y-5">
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">History & Heritage</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Business Directory</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Schools & Childcare</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Sport & Clubs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-8 text-xs uppercase tracking-[0.2em]">Connect</h4>
          <ul className="space-y-5">
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">What's On</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Visit Crettyard</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Contact Us</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium">Privacy Policy</a></li>
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

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <ExploreGrid />
        <FeaturedBusinesses />
        <CommunityEvents />
        <FindUs />
        <LatestUpdates />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
