import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Local images — real photographs of the Crettyard area
import imgCrettyardJunction from '@assets/Crettyard,_County_Kilkenny_-_geograph.org.uk_-_1783304_1775041408617.jpg';
import imgChurchDoonane from '@assets/church-at-doonane_resize_1775041408616.webp';
import imgNewtownFlemings from '@assets/newtown-8_resize_1775041408617.jpg';
import imgMoscowChimneyStack from '@assets/moscow-possible-airshaft-and-other-items-8_resize_1775041408617.webp';
import imgMoscowAirshaft from '@assets/moscow-possible-airshaft-and-other-items-4_resize_1775041408617.jpg';
import imgDoonaneClonbrockFarm from '@assets/doonane-clonbrock-farm-1_resize_1775041408616.webp';
import imgGenevaStores from '@assets/geneva-stores-crettyard-1_resize_1775041408615.jpg';
import imgCloghRuins from '@assets/clogh-brewery-2_resize_1775041408616.webp';

const imgCoalMiningHistorical = '/images/crettyard-coal-mining-history.webp';

const sections = [
  { id: 'origins', label: 'Origins' },
  { id: 'coal', label: 'Coal & Industry' },
  { id: 'newtown', label: 'Newtown, Moscow & Geneva' },
  { id: 'diaspora', label: 'Migration' },
  { id: 'legacy', label: 'Legacy' },
  { id: 'sources', label: 'Sources' },
];

const timeline = [
  { era: 'Early Christian', desc: 'Parish roots and ecclesiastical landscape in the wider Killabban area linked to St. Abban.' },
  { era: 'Medieval', desc: 'Development of the parish landscape; growth of the district across the Castlecomer Plateau.' },
  { era: '17th century', desc: 'Earliest exploitation of local coal seams; the Three Foot Seam worked from Coolbawn to Crettyard.' },
  { era: '18th–19th century', desc: 'Expansion of mining across the Castlecomer Plateau; deeper pit development and the Jarrow Seam.' },
  { era: 'Early 19th century', desc: 'Grand Canal Company ambitions; planned collier settlement at Newtown; origin of Moscow and Geneva place-names.' },
  { era: '19th century', desc: 'Migration from the coalfield to Pennsylvania; Crettyard families join the "Irish Valley" mining communities.' },
  { era: '20th century', desc: 'Decline of mining; survival of place-memory, heritage and community identity across the landscape.' },
];

const sources = [
  { label: 'Townlands.ie — Crettyard townland profile', href: 'https://www.townlands.ie/laois/slievemargy/killabban/newtown/crettyard/' },
  { label: 'Ask About Ireland — Coal Seams of the Castlecomer Plateau', href: 'https://www.askaboutireland.ie/reading-room/environment-geography/physical-landscape/castlecomer-plateau/coalmining-in-castlecomer/coal-seams/' },
  { label: 'Irish Waterways History — South of Moscow, north of Geneva', href: 'https://irishwaterwayshistory.com/abandoned-or-little-used-irish-waterways/the-grand-canal/south-of-moscow-north-of-geneva/' },
  { label: 'Laois Burial Grounds Survey — Volume 2', href: 'https://laois.ie/sites/default/files/2024-10/LBGS_LR_Vol2-min_0.pdf' },
  { label: 'Wikimedia Commons — Crettyard images', href: 'https://commons.wikimedia.org/wiki/Category:Crettyard' },
  { label: 'Wikipedia — Crettyard overview', href: 'https://en.wikipedia.org/wiki/Crettyard' },
];

// Gallery of additional local photographs
const gallery = [
  { src: imgGenevaStores, alt: 'Geneva Stores, Crettyard — shop and petrol station at the crossroads', caption: 'Geneva Stores, Crettyard junction' },
  { src: imgDoonaneClonbrockFarm, alt: 'Doonane Clonbrock Farm with ornate white iron gates', caption: 'Doonane — Clonbrock Farm' },
  { src: imgCloghRuins, alt: 'Old stone ruins and dry stone wall near Clogh in the Crettyard area', caption: 'Stone heritage — Clogh area' },
];

export default function HistoryPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 overflow-hidden bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 z-10"
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ArrowRight size={12} />
                <span className="text-primary">History & Heritage</span>
              </nav>

              <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs mb-4">Crettyard, County Laois</p>
              <h1 className="font-headline text-5xl md:text-8xl font-extrabold text-on-surface tracking-tighter leading-[0.9] mb-8">
                History of <span className="text-primary italic">Crettyard</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mb-10">
                Crettyard is a small place with a surprisingly deep story. Its history stretches from the old parish landscape of Killabban to the coal seams of the Castlecomer Plateau, and from roadside settlement to migration, memory and local identity.
              </p>

              {/* Section nav pills */}
              <div className="flex flex-wrap gap-3">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="px-5 py-2 rounded-full bg-surface-container border border-outline-variant/20 text-sm font-semibold text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-all"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src={imgCrettyardJunction}
                alt="Crettyard village junction on the N78, County Laois"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-primary uppercase tracking-widest">
                  Crettyard junction, Co. Laois
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-surface">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl text-on-surface-variant leading-[1.8] font-medium mb-6">
              Crettyard, or <em className="text-on-surface not-italic font-semibold">Crochta Ard</em>, is a historic townland in the civil parish of Killabban, barony of Slievemargy, County Laois. The townland sits close to the Laois-Kilkenny border and is part of a wider district that includes places such as Newtown, Doonane, Monavea and Mayo.
            </p>
            <p className="text-xl md:text-2xl text-on-surface-variant leading-[1.8] font-medium">
              That wider landscape matters. The story of Crettyard is not only the story of one junction or one village cluster, but of a parish, a plateau and a working countryside shaped over centuries by religion, transport, mining and community life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Origins ──────────────────────────────────────────────────────── */}
      <section id="origins" className="py-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Origins</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-8">Origins in the parish landscape</h2>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
              <p>Long before modern traffic passed through Crettyard, the area belonged to the older world of Killabban. Local historical research connects the district with an ancient ecclesiastical landscape associated with St. Abban, and with a parish structure that developed over many centuries.</p>
              <p>This older layer still survives in the surrounding geography. Nearby churches, burial grounds and holy wells help explain why Crettyard feels rooted in more than one place at once: the settlement may be modest in size, but its historical setting is broad and unusually rich.</p>
              <p>For visitors, this is an important way to read the map. Crettyard makes most sense not as an isolated dot on a road, but as the centre of a local heritage landscape linking Killabban, Newtown, Mayo, Doonane and Monavea.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl -rotate-1 hover:rotate-0 transition-transform duration-700">
              <img
                className="w-full h-[420px] object-cover"
                src={imgChurchDoonane}
                alt="Church at Doonane, in the Crettyard parish area of County Laois"
              />
              <div className="bg-surface-container px-6 py-4">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Church at Doonane — parish heritage</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Coal & Industry ──────────────────────────────────────────────── */}
      <section id="coal" className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 lg:col-start-7 lg:row-start-1"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Coal & Industry</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-8">The coal beneath Crettyard</h2>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
              <p>If one force shaped Crettyard more than any other, it was the geology of the Castlecomer Plateau. Unlike much of the limestone midlands, this upland district was defined by coal measures, and those seams changed the local economy for generations.</p>
              <p>Historical sources on the Castlecomer coalfield note that the Three Foot Seam extended from Coolbawn to Crettyard and was worked from around the seventeenth century. What sounds like a small rural place today was once part of a much larger industrial story involving pits, shafts, tramways, labour and extraction.</p>
              <p>Mining did not simply provide employment. It altered the landscape itself. Early descriptions of the district speak of ground broken by openings, spoil and workings, showing how deeply the coal industry marked daily life in this part of Laois.</p>
              <p>Later development pushed the mines deeper. The Jarrow Seam became one of the better known workings of the district, and pit names such as Rock Bog and Vera remained part of local memory long after the peak years of extraction had passed.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:row-start-1"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700 bg-stone-900">
              <img
                className="w-full h-[420px] object-cover opacity-90 sepia-[0.2]"
                src={imgCoalMiningHistorical}
                alt="Historical photograph of coal mining operations on the Castlecomer Plateau, County Laois"
              />
              <div className="bg-stone-800 px-6 py-4">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Coal workings, Castlecomer Plateau — historical photograph</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-20"
        >
          <blockquote className="border-l-4 border-primary pl-8 py-4">
            <p className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface italic leading-snug">
              "What sounds like a small rural place today was once part of a much larger industrial story involving pits, shafts, tramways, labour and extraction."
            </p>
          </blockquote>
        </motion.div>
      </section>

      {/* ── Newtown, Moscow & Geneva ─────────────────────────────────────── */}
      <section id="newtown" className="py-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6"
            >
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Newtown, Moscow & Geneva</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-8">Newtown, Moscow and Geneva</h2>
              <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
                <p>One of the most striking stories in the Crettyard area comes from nearby Newtown. In the early nineteenth century, the Grand Canal Company became involved in the local coalfield and established a planned settlement for colliers.</p>
                <p>This industrial ambition left behind one of the great place-name curiosities in Irish local history. Historical writing on the area describes Newtown as lying <em className="text-on-surface font-semibold not-italic">"south of Moscow and north of Geneva"</em>, preserving a remarkable cluster of names in the Laois borderlands.</p>
                <p>These names still give the area a distinct personality. They suggest a district that once thought big, worked hard and connected local industry to wider transport dreams, even when some of those ambitions proved difficult to complete.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 lg:col-start-8"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl -rotate-1 hover:rotate-0 transition-transform duration-700">
                <img
                  className="w-full h-[380px] object-cover"
                  src={imgNewtownFlemings}
                  alt="Flemings pub and off-licence at the Newtown crossroads on the N78 towards Kilkenny"
                />
                <div className="bg-surface-container px-6 py-4">
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Flemings, Newtown — N78 crossroads</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mining chimney — a physical remnant of that era */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  className="w-full h-[500px] object-cover object-top"
                  src={imgMoscowChimneyStack}
                  alt="Tall stone mining chimney stack near Moscow, a surviving landmark from the Castlecomer coalfield"
                />
                <div className="bg-surface-container px-6 py-4">
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Mining chimney stack at Moscow</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 lg:col-start-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Surviving landmarks</p>
              <h3 className="font-headline text-3xl font-extrabold tracking-tight mb-6">Remnants of the industrial age</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                The tall stone chimney stack at Moscow is one of the most striking physical reminders of the coalfield era still standing in the landscape. Once part of a pumping or winding engine house, it marks the scale of industry that once operated across this plateau — an industry that shaped not just the economy but the identity of the entire district. These landmarks root the place-names of Moscow and Geneva in something concrete and real.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Migration ────────────────────────────────────────────────────── */}
      <section id="diaspora" className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Migration</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-8">Hard work, hardship and migration</h2>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
              <p>Coal brought wages, but it also brought danger, uncertainty and physically demanding work. Families in the wider Crettyard district lived with the boom-and-bust rhythms of an extractive industry, and those pressures shaped local life deeply.</p>
              <p>In the nineteenth century, migration became part of the story. Research gathered for this project traces strong links between the Leinster coalfield and Pennsylvania, where families from Crettyard and neighbouring places joined mining communities that became known as the "Irish Valley".</p>
              <p>That migration story gives Crettyard a wider horizon. The area is local and rural, but its history reaches across the Atlantic through surnames, descendants and family memory.</p>
            </div>

            {/* Callout cards */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Pennsylvania', desc: 'Primary destination for Crettyard mining families in the 19th century' },
                { label: 'Irish Valley', desc: 'Name given to communities shaped by Leinster coalfield emigrants' },
                { label: 'Killabban parish', desc: 'Parish network linking Crettyard to its diaspora through surname and record' },
              ].map((item) => (
                <div key={item.label} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                  <p className="font-headline text-lg font-extrabold text-primary mb-2">{item.label}</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700">
              <img
                className="w-full h-[460px] object-cover"
                src={imgDoonaneClonbrockFarm}
                alt="Doonane Clonbrock Farm with ornate white iron gates — a historic property in the Crettyard area"
              />
              <div className="bg-surface-container px-6 py-4">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Doonane — Clonbrock Farm</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Legacy ───────────────────────────────────────────────────────── */}
      <section id="legacy" className="py-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Legacy</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-8">The past in the present</h2>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
              <p>Modern Crettyard is not a museum piece, and that is part of its appeal. The roads are modern, the community is active, and the area continues to evolve, yet the older layers remain visible in its townlands, graveyards, sporting grounds, field patterns and local stories.</p>
              <p>What makes Crettyard's history memorable is that it is both intimate and wide-ranging. It is the story of a parish landscape, a coal district, a transport corridor and a community that has endured through change.</p>
              <p>Stand here long enough and the place begins to read differently. Beneath the everyday landscape lies an older world of worship, work, extraction, travel and resilience.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-[460px] object-cover"
                src={imgMoscowAirshaft}
                alt="19th-century place of prayer at Moscow near Crettyard — gothic arched openings overgrown with vegetation"
              />
              <div className="bg-surface-container px-6 py-4">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Moscow — 19th-century place of prayer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight">Historic outline</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-outline-variant/30 ml-[5px]"></div>
            <ol className="space-y-10 pl-10">
              {timeline.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="relative"
                >
                  <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-surface"></div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{item.era}</p>
                  <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Photo gallery strip ───────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight">More from the area</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {gallery.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="h-56 overflow-hidden bg-surface-container">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={photo.src}
                    alt={photo.alt}
                  />
                </div>
                <div className="bg-surface-container px-5 py-4">
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sources ──────────────────────────────────────────────────────── */}
      <section id="sources" className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="text-primary size-8" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">References</span>
            </div>
            <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-4">Sources and references</h2>
            <p className="text-on-surface-variant text-lg mb-12">Readers can confirm the history on this page using the sources below.</p>
            <ul className="space-y-4">
              {sources.map((src, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                >
                  <a
                    href={src.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 hover:shadow-lg transition-all"
                  >
                    <ExternalLink size={18} className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors font-medium leading-relaxed">{src.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto signature-gradient rounded-[2rem] p-12 md:p-20 text-center text-on-primary shadow-2xl"
        >
          <h2 className="font-headline text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter">Know a piece of the story?</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-12 leading-relaxed">
            If you have local knowledge, family records, photographs or memories connected to Crettyard's history, we would love to hear from you. Help us build a fuller picture of this remarkable place.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact?category=share-story" className="px-10 py-5 rounded-full bg-white text-primary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
              Share Your Story
            </Link>
            <Link to="/" className="px-10 py-5 rounded-full border-2 border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
