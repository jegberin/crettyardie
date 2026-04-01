import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, ArrowRight } from 'lucide-react';

interface Section {
  heading: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    heading: 'Who we are',
    content: (
      <p>
        Crettyard.ie is a local website providing information about Crettyard, its community, history, businesses,
        events, and local submissions. The website also includes user contribution features such as directory updates,
        contact forms, event submissions, and notice board content.
      </p>
    ),
  },
  {
    heading: 'Personal data we may collect',
    content: (
      <>
        <p className="mb-3">Depending on how you use the site, we may collect:</p>
        <ul className="space-y-2 list-none">
          {[
            'Contact details you submit, such as your name, email address, phone number, or organisation name.',
            'Content you choose to send us, such as business details, event information, stories, corrections, photos, or notice board submissions.',
            'Technical and usage data, such as browser type, device information, approximate location, referring pages, and website interaction data collected through Google Analytics.',
            'Security and platform data that may be processed through infrastructure providers such as Cloudflare in connection with hosting, logs, or submission handling.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    heading: 'How we use personal data',
    content: (
      <>
        <p className="mb-3">We may use personal data to:</p>
        <ul className="space-y-2 list-none">
          {[
            'Respond to enquiries sent through the contact page.',
            'Review and publish submissions to the directory, notice board, events listings, or other parts of the site.',
            'Verify corrections, edits, or removal requests related to listings or published content.',
            'Improve website performance, usability, and content through analytics reporting.',
            'Protect the site from spam, abuse, or misuse.',
            'Maintain records of submissions and editorial decisions for website administration.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    heading: 'Legal bases',
    content: (
      <>
        <p className="mb-3">Where GDPR applies, we may rely on one or more of the following legal bases:</p>
        <div className="space-y-3">
          {[
            ['Consent', 'For example where you submit information voluntarily or accept analytics cookies.'],
            ['Legitimate interests', 'For example to operate, secure, improve, and manage the website and its local information features.'],
            ['Legal obligations', 'Where we are required to keep or disclose information under applicable law.'],
          ].map(([title, desc]) => (
            <div key={title} className="bg-surface-container-low rounded-xl p-4">
              <p className="font-semibold text-on-surface text-sm mb-1">{title}</p>
              <p className="text-sm text-on-surface-variant">{desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    heading: 'Google Analytics',
    content: (
      <>
        <p className="mb-3">
          We use Google Analytics to understand how visitors use Crettyard.ie and to improve the site. Analytics may
          collect first-party cookies, device and browser data, usage activity, and IP-related information for
          security and approximate geographic reporting.
        </p>
        <p className="mb-3">
          We aim to use Google Analytics in a privacy-conscious manner. Where required by law, analytics tracking is
          only activated after you give consent. Google Analytics cookies are not strictly necessary and are not
          loaded before consent is given, in line with Irish GDPR guidance.
        </p>
        <p>
          Google acts as a data processor for Google Analytics, while site owners remain controllers over the
          collection, access, retention, and deletion of their analytics data. We will not send personally
          identifiable information to Google Analytics.
        </p>
      </>
    ),
  },
  {
    heading: 'Notice board and Cloudflare services',
    content: (
      <>
        <p className="mb-3">
          Notice board submissions and related user-generated content may be stored using Cloudflare-hosted services,
          including a Cloudflare database (D1) and object storage (R2). Cloudflare processes service-related data
          and logs in connection with its products and hosted services.
        </p>
        <p>
          If you post to the notice board or submit content for publication, we may store the information you
          provide — including contact details, message content, and related metadata — needed to manage, moderate,
          or display the submission.
        </p>
      </>
    ),
  },
  {
    heading: 'User submissions',
    content: (
      <>
        <p className="mb-3">
          If you submit a business, event, correction, photo, story, history note, or notice board item, we may
          review, edit for clarity, verify, publish, decline, or remove the submission in line with our editorial
          or moderation process.
        </p>
        <p>
          Please do not submit sensitive personal data or personal data about other people unless you have a lawful
          basis and permission to do so.
        </p>
      </>
    ),
  },
  {
    heading: 'Sharing of data',
    content: (
      <p>
        We do not sell personal data. We may share data only where necessary with service providers who support the
        operation of the website — such as analytics, hosting, database, security, or email/form handling providers.
        Depending on your configuration, service providers may process data outside Ireland or the European Economic Area.
      </p>
    ),
  },
  {
    heading: 'Data retention',
    content: (
      <>
        <p className="mb-3">
          We will keep personal data only for as long as reasonably necessary for the purpose for which it was
          collected.
        </p>
        <div className="space-y-2">
          {[
            ['Contact enquiries', 'Retained for up to 12 months.'],
            ['Directory & notice board submissions', 'Retained while active and for an administrative period afterward.'],
            ['Analytics data', 'Retained according to the shortest useful Google Analytics retention setting chosen.'],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-3 text-sm">
              <span className="flex-shrink-0 font-semibold text-on-surface min-w-[200px]">{title}</span>
              <span className="text-on-surface-variant">{desc}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    heading: 'Your rights',
    content: (
      <>
        <p className="mb-3">Depending on applicable law, you may have rights to:</p>
        <ul className="space-y-2 list-none">
          {[
            'Request access to your personal data.',
            'Request correction of inaccurate data.',
            'Request deletion of data in certain circumstances.',
            'Object to certain processing.',
            'Withdraw consent where processing is based on consent.',
            'Lodge a complaint with the Irish Data Protection Commission.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    heading: 'Security',
    content: (
      <p>
        We take reasonable steps to protect data submitted through the website, including use of reputable service
        providers and access controls appropriate to the scale of the project. No method of transmission or storage
        is completely secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    heading: 'Children',
    content: (
      <p>
        If the site allows public submissions, parents or guardians should take care when sharing information
        connected to children, including names, photos, school details, or event participation. This is especially
        relevant given that the site includes sections covering schools, childcare, sports, events, and photo sharing.
      </p>
    ),
  },
  {
    heading: 'Third-party links',
    content: (
      <p>
        The website may link to external websites, social media pages, business listings, or partner services.
        We are not responsible for the privacy practices of those third-party sites.
      </p>
    ),
  },
  {
    heading: 'Changes to this policy',
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes to the website, legal requirements,
        analytics setup, notice board features, or service providers.
      </p>
    ),
  },
  {
    heading: 'Contact',
    content: (
      <p>
        For privacy-related questions or requests, please{' '}
        <Link to="/contact" className="text-primary underline underline-offset-2 hover:no-underline">
          contact us through the contact page
        </Link>{' '}
        on Crettyard.ie.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="signature-gradient text-white py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto pt-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-white/80 text-xs font-bold uppercase tracking-widest mb-4">
            <Shield size={13} />
            Legal
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/70 text-sm">Effective date: 1 April 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-14">
        <div className="prose-custom mb-12">
          <p className="text-on-surface-variant leading-relaxed">
            Crettyard.ie is a community-focused website about Crettyard, including local information, directory
            content, and a notice board. This Privacy Policy explains what personal data we may collect, how we
            use it, and the choices available to users.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <motion.section
              key={s.heading}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <h2 className="font-headline text-xl font-bold text-on-surface mb-3 pb-2 border-b border-surface-container">
                {s.heading}
              </h2>
              <div className="text-on-surface-variant leading-relaxed text-sm [&_p]:mb-0">
                {s.content}
              </div>
            </motion.section>
          ))}
        </div>

        <div className="mt-14 p-6 bg-surface-container-low rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-on-surface text-sm mb-0.5">Also see our Cookie Policy</p>
            <p className="text-on-surface-variant text-xs">How we use cookies and your consent choices.</p>
          </div>
          <Link
            to="/cookies"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full signature-gradient text-white font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/20 whitespace-nowrap"
          >
            Cookie Policy <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
