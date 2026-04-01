import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Cookie, ArrowRight } from 'lucide-react';
import { CookieSettingsLink } from '../components/CookieBanner';

interface CookieRow {
  name: string;
  provider: string;
  purpose: string;
  type: 'Essential' | 'Analytics' | 'Preference';
  duration: string;
}

const cookieTable: CookieRow[] = [
  {
    name: 'crettyard_cookie_consent',
    provider: 'Crettyard.ie',
    purpose: 'Stores your cookie consent preferences so the banner is not shown on every page visit.',
    type: 'Essential',
    duration: '1 year',
  },
  {
    name: 'crettyard_auth',
    provider: 'Crettyard.ie',
    purpose: 'Keeps you signed in to the notice board. Stored in browser localStorage.',
    type: 'Essential',
    duration: 'Session / 7 days',
  },
  {
    name: '_ga, _ga_*',
    provider: 'Google Analytics',
    purpose: 'Used to distinguish users and track site usage for analytics reporting. Only set after consent.',
    type: 'Analytics',
    duration: '2 years',
  },
  {
    name: '_gid',
    provider: 'Google Analytics',
    purpose: 'Used to distinguish users across sessions. Only set after consent.',
    type: 'Analytics',
    duration: '24 hours',
  },
];

const typeColors: Record<CookieRow['type'], string> = {
  Essential: 'bg-green-100 text-green-800',
  Analytics: 'bg-blue-100 text-blue-800',
  Preference: 'bg-amber-100 text-amber-800',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="signature-gradient text-white py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto pt-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-white/80 text-xs font-bold uppercase tracking-widest mb-4">
            <Cookie size={13} />
            Legal
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-white/70 text-sm">Effective date: 1 April 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-14 space-y-10">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-on-surface-variant leading-relaxed"
        >
          At Crettyard.ie, we use cookies and similar technologies to help the website work properly, understand
          how people use the site, and improve content and features over time. This policy explains what cookies
          we use and how you can control them.
        </motion.p>

        {/* What are cookies */}
        <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-headline text-xl font-bold text-on-surface mb-3 pb-2 border-b border-surface-container">
            What are cookies?
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Cookies are small text files placed on your device when you visit a website. They can help a site
            remember your preferences, support core functions, and collect information about how the site is used.
          </p>
        </motion.section>

        {/* Cookie categories */}
        <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-headline text-xl font-bold text-on-surface mb-4 pb-2 border-b border-surface-container">
            How we use cookies
          </h2>
          <div className="space-y-4">
            {[
              {
                label: 'Strictly necessary cookies',
                color: 'bg-green-50 border-green-200',
                badge: 'Always active',
                badgeColor: 'bg-green-100 text-green-800',
                desc: 'These are needed for the website to function properly — security, form handling, login sessions, and your stored consent choice. Irish GDPR guidance notes that strictly necessary cookies are the narrow exception to the consent requirement and do not require your prior consent.',
              },
              {
                label: 'Analytics cookies',
                color: 'bg-blue-50 border-blue-200',
                badge: 'Requires consent',
                badgeColor: 'bg-blue-100 text-blue-800',
                desc: 'These help us understand how visitors use the site — which pages are visited, how long users stay, and which devices or browsers are used. We use Google Analytics, which collects first-party cookies, device and browser data, and on-site activity data. Analytics cookies are not set until you give consent.',
              },
              {
                label: 'Preference cookies',
                color: 'bg-amber-50 border-amber-200',
                badge: 'Requires consent',
                badgeColor: 'bg-amber-100 text-amber-800',
                desc: 'These may remember display preferences or settings if implemented on the site. Preference-type cookies are assessed separately from strictly necessary cookies and require consent where applicable.',
              },
            ].map(item => (
              <div key={item.label} className={`rounded-xl border p-4 ${item.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm text-on-surface">{item.label}</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Cookie table */}
        <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-headline text-xl font-bold text-on-surface mb-4 pb-2 border-b border-surface-container">
            Cookies we use
          </h2>
          <div className="overflow-x-auto rounded-xl border border-surface-container-high">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant uppercase tracking-wider">
                  <th className="text-left px-4 py-3 font-bold">Name</th>
                  <th className="text-left px-4 py-3 font-bold">Provider</th>
                  <th className="text-left px-4 py-3 font-bold">Purpose</th>
                  <th className="text-left px-4 py-3 font-bold">Type</th>
                  <th className="text-left px-4 py-3 font-bold">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {cookieTable.map(row => (
                  <tr key={row.name} className="bg-white hover:bg-surface-container-low transition-colors">
                    <td className="px-4 py-3 font-mono text-on-surface whitespace-nowrap">{row.name}</td>
                    <td className="px-4 py-3 text-on-surface-variant whitespace-nowrap">{row.provider}</td>
                    <td className="px-4 py-3 text-on-surface-variant leading-relaxed">{row.purpose}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-xs whitespace-nowrap ${typeColors[row.type]}`}>{row.type}</span>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant whitespace-nowrap">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Google Analytics */}
        <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-headline text-xl font-bold text-on-surface mb-3 pb-2 border-b border-surface-container">
            Google Analytics
          </h2>
          <div className="text-on-surface-variant text-sm leading-relaxed space-y-3">
            <p>
              We use Google Analytics to collect aggregated information about website traffic and usage. Analytics
              may collect first-party cookies, device and browser information, approximate location derived from
              IP-related processing, and on-site interaction data.
            </p>
            <p>
              Where required by law, analytics cookies will only be used after you have given consent through our
              cookie banner. Irish guidance states that Google Analytics cookies are not strictly necessary and
              should not load before consent.
            </p>
            <p>
              We intend to configure Google Analytics in a privacy-conscious way, including avoiding the
              transmission of personally identifiable information to Google Analytics.
            </p>
          </div>
        </motion.section>

        {/* Cloudflare */}
        <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-headline text-xl font-bold text-on-surface mb-3 pb-2 border-b border-surface-container">
            Cloudflare-related technologies
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            We use Cloudflare services to host the site and store notice board data and website submissions.
            Cloudflare processes service-related data and customer logs in connection with its hosted and
            infrastructure services. Where security or platform-level cookies are used to protect the website or
            prevent abuse, those may be treated as necessary where they are genuinely required for the service.
          </p>
        </motion.section>

        {/* Managing cookies */}
        <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-headline text-xl font-bold text-on-surface mb-4 pb-2 border-b border-surface-container">
            Managing cookies
          </h2>
          <div className="space-y-3 text-sm text-on-surface-variant leading-relaxed">
            <p>You can control cookies through:</p>
            <ul className="space-y-2 list-none">
              {[
                <>Our <strong className="text-on-surface">cookie consent banner</strong> — shown on your first visit. You can change your choice at any time using the link below.</>,
                <>Your <strong className="text-on-surface">browser settings</strong>, which allow you to block or delete cookies for any site.</>,
                <>Google's <strong className="text-on-surface">browser add-on</strong> for opting out of Google Analytics, which disables analytics measurement when installed and enabled.</>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs italic">
              Please note that blocking some cookies may affect how parts of the website function.
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3 p-4 bg-surface-container-low rounded-xl">
            <Cookie size={18} className="text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-on-surface mb-0.5">Change your cookie preferences</p>
              <p className="text-xs text-on-surface-variant">Resets your saved choice so the consent banner appears again.</p>
            </div>
            <CookieSettingsLink />
          </div>
        </motion.section>

        {/* Changes */}
        <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-headline text-xl font-bold text-on-surface mb-3 pb-2 border-b border-surface-container">
            Changes to this policy
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in the website, legal
            requirements, or the services we use, including changes to analytics or notice board features.
          </p>
        </motion.section>

        {/* Contact */}
        <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-headline text-xl font-bold text-on-surface mb-3 pb-2 border-b border-surface-container">
            Contact
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            If you have questions about this Cookie Policy, please{' '}
            <Link to="/contact" className="text-primary underline underline-offset-2 hover:no-underline">
              contact us through the contact page
            </Link>{' '}
            on Crettyard.ie.
          </p>
        </motion.section>

        <div className="mt-8 p-6 bg-surface-container-low rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-on-surface text-sm mb-0.5">See our full Privacy Policy</p>
            <p className="text-on-surface-variant text-xs">How we handle your personal data.</p>
          </div>
          <Link
            to="/privacy"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full signature-gradient text-white font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/20 whitespace-nowrap"
          >
            Privacy Policy <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </div>
  );
}
