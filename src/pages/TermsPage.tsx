import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

interface Section {
  number: string;
  heading: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    number: '1',
    heading: 'About the site',
    content: (
      <p>
        Crettyard.ie is a community website focused on Crettyard and the surrounding area, including local history,
        businesses, events, community information, notice board features, and advertising opportunities. The site
        includes a contact and contribution area for businesses, events, photos, stories, history, and corrections.
      </p>
    ),
  },
  {
    number: '2',
    heading: 'Acceptance of these terms',
    content: (
      <p>
        By using Crettyard.ie, submitting content to the site, or purchasing or requesting advertising, you agree
        to these Terms of Service. If you do not agree, you should not use the submission features, notice board,
        or advertising services provided through the site.
      </p>
    ),
  },
  {
    number: '3',
    heading: 'Changes to the site or terms',
    content: (
      <p>
        We may update the website, its features, and these Terms from time to time. We may also change, suspend,
        or remove any part of the site, including the notice board, directory features, or advertising placements,
        where reasonably necessary for operational, editorial, technical, or legal reasons.
      </p>
    ),
  },
  {
    number: '4',
    heading: 'Community submissions',
    content: (
      <>
        <p className="mb-4">
          The site may allow users to submit information, including business listings, corrections, event details,
          photos, stories, local history, notice board posts, and other community content.
        </p>
        <p className="mb-3 font-medium text-on-surface">By submitting content, you confirm that:</p>
        <ul className="space-y-2 list-none mb-4">
          {[
            'the information you provide is accurate to the best of your knowledge;',
            'you have the right to submit it;',
            'it does not infringe another person\'s rights;',
            'it is not unlawful, defamatory, misleading, abusive, or offensive.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          We may review, edit, decline, delay, publish, unpublish, or remove submissions at our discretion,
          particularly where content appears inaccurate, inappropriate, unlawful, promotional beyond the intended
          category, or unsuitable for the website.
        </p>
      </>
    ),
  },
  {
    number: '5',
    heading: 'Notice board rules',
    content: (
      <>
        <p className="mb-3">
          If the website includes a public or moderated notice board, posts must be relevant to the local community
          and must not include spam, scams, unlawful offers, misleading claims, or abusive content. Notice board
          content may be moderated before or after publication, and we may remove content that does not meet these
          standards.
        </p>
        <p>
          Users remain responsible for the content of their submissions. We do not guarantee the accuracy,
          completeness, or reliability of user-posted content.
        </p>
      </>
    ),
  },
  {
    number: '6',
    heading: 'Advertising services',
    content: (
      <>
        <p className="mb-4">
          Crettyard.ie may offer paid advertising placements, sponsored listings, featured placements, or other
          promotional opportunities. By placing or requesting advertising on Crettyard.ie, the advertiser agrees that:
        </p>
        <ul className="space-y-2 list-none mb-4">
          {[
            'all ad copy, images, claims, links, and materials are lawful, accurate, and not misleading;',
            'the advertiser has the right to use all text, logos, images, and other materials supplied;',
            'the advertisement complies with applicable law and relevant advertising standards;',
            'the advertiser is responsible for the content of the advertisement and any landing page it links to.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mb-3">We reserve the right to approve or reject any advertisement, request edits before publication,
          refuse categories of advertising that do not fit the site, and remove or suspend advertising where concerns
          arise about legality, accuracy, complaints, technical problems, reputational issues, or non-payment.</p>
        <p>
          Placement dates, positions, durations, prices, and creative specifications may be agreed individually with
          each advertiser. Unless expressly agreed otherwise in writing, ad placement location is indicative rather
          than guaranteed, and minor adjustments may be made for layout, mobile display, or editorial reasons.
        </p>
      </>
    ),
  },
  {
    number: '7',
    heading: 'Payment, cancellations, and refunds',
    content: (
      <>
        <p className="mb-3">
          If advertising is sold through the website or by direct agreement, payment terms should be agreed in
          advance. Unless otherwise agreed, advertising may be withheld until payment is received.
        </p>
        <p className="mb-3">
          If an advertiser cancels before publication, any refund will be at our discretion unless a clear refund
          policy has been agreed. If an advertisement is removed because it breaches these Terms or applicable law,
          we may decline to refund any payment already made.
        </p>
        <p>
          Where the site cannot deliver an agreed ad placement for reasons within our control, we may offer a
          replacement placement, rescheduled campaign, credit, or refund as appropriate.
        </p>
      </>
    ),
  },
  {
    number: '8',
    heading: 'Intellectual property',
    content: (
      <>
        <p className="mb-3">
          All website design, branding, layout, text, and original content on Crettyard.ie remain the property of
          the site owner or its licensors unless otherwise stated. Users and advertisers must not copy or reuse site
          materials beyond normal browsing and sharing without permission.
        </p>
        <p>
          If you submit content, you grant Crettyard.ie a non-exclusive right to store, review, edit, reproduce,
          and publish that content for operating, promoting, and archiving the site, unless you expressly agree a
          narrower arrangement with us. This applies to stories, directory submissions, historic images, and notice
          board content.
        </p>
      </>
    ),
  },
  {
    number: '9',
    heading: 'Accuracy and availability',
    content: (
      <>
        <p className="mb-3">
          We try to keep website information accurate and up to date, but we do not guarantee that all content,
          listings, notices, event details, or advertisements will always be complete, current, or error-free.
        </p>
        <p>We do not guarantee uninterrupted access to the website or that all features will always be available.</p>
      </>
    ),
  },
  {
    number: '10',
    heading: 'Links to other sites',
    content: (
      <p>
        The site may contain links to external websites, business listings, social media pages, or advertiser
        websites. We are not responsible for the content, availability, or practices of third-party websites.
      </p>
    ),
  },
  {
    number: '11',
    heading: 'Limitation of liability',
    content: (
      <>
        <p className="mb-3">
          To the fullest extent permitted by law, Crettyard.ie is not liable for indirect, incidental, reputational,
          or consequential loss arising from use of the site, reliance on community submissions, notice board posts,
          directory content, or advertisements.
        </p>
        <p>Nothing in these Terms is intended to exclude liability where it cannot lawfully be excluded.</p>
      </>
    ),
  },
  {
    number: '12',
    heading: 'Privacy and cookies',
    content: (
      <p>
        Use of the site may involve the processing of personal data and the use of cookies or analytics technologies.
        These are described in our{' '}
        <Link to="/privacy" className="text-primary underline underline-offset-2 hover:no-underline">Privacy Policy</Link>
        {' '}and{' '}
        <Link to="/cookies" className="text-primary underline underline-offset-2 hover:no-underline">Cookie Policy</Link>.
      </p>
    ),
  },
  {
    number: '13',
    heading: 'Termination or restriction',
    content: (
      <p>
        We may restrict access to submission features, remove content, refuse advertising, or suspend services
        where these Terms are breached, where complaints are received, where legal concerns arise, or where
        necessary to protect the website or its users.
      </p>
    ),
  },
  {
    number: '14',
    heading: 'Governing law',
    content: (
      <p>
        These Terms are governed by the laws of Ireland, and any disputes relating to the website or services
        will be handled subject to the jurisdiction of the Irish courts.
      </p>
    ),
  },
  {
    number: '15',
    heading: 'Contact',
    content: (
      <p>
        For questions about these Terms, advertising requests, or content concerns, please{' '}
        <Link to="/contact" className="text-primary underline underline-offset-2 hover:no-underline">
          use the contact page
        </Link>{' '}
        on Crettyard.ie.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="signature-gradient text-white py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto pt-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-white/80 text-xs font-bold uppercase tracking-widest mb-4">
            <FileText size={13} />
            Legal
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-white/70 text-sm">Effective date: 1 April 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-on-surface-variant leading-relaxed mb-12"
        >
          Welcome to Crettyard.ie. These Terms of Service govern your use of the website, including browsing the
          site, submitting information, posting notices, requesting directory changes, and purchasing or enquiring
          about advertising space.
        </motion.p>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <motion.section
              key={s.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <h2 className="font-headline text-xl font-bold text-on-surface mb-3 pb-2 border-b border-surface-container flex items-baseline gap-3">
                <span className="text-primary/50 font-bold tabular-nums text-base">{s.number}.</span>
                {s.heading}
              </h2>
              <div className="text-on-surface-variant leading-relaxed text-sm [&_p]:mb-0">
                {s.content}
              </div>
            </motion.section>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/privacy"
            className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high transition-colors group"
          >
            <p className="font-semibold text-on-surface text-sm mb-1 group-hover:text-primary transition-colors">Privacy Policy</p>
            <p className="text-on-surface-variant text-xs">How we handle your personal data.</p>
          </Link>
          <Link
            to="/cookies"
            className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high transition-colors group"
          >
            <p className="font-semibold text-on-surface text-sm mb-1 group-hover:text-primary transition-colors">Cookie Policy</p>
            <p className="text-on-surface-variant text-xs">How we use cookies and your consent choices.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
