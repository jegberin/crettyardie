import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Megaphone, Store, Edit3, Camera, BookOpen, FileText,
  Calendar, MessageCircle, ChevronRight, ChevronLeft,
  CheckCircle, Upload, X, AlertCircle, Loader2
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'file';
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  rows?: number;
  condition?: (data: Record<string, string>) => boolean;
}

interface Category {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  fields: FieldDef[];
}

// ─── Category definitions ─────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: 'advertise',
    label: 'Advertise on Crettyard.ie',
    description: 'Promote your business, event or offer to the local community.',
    icon: Megaphone,
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    fields: [
      { name: 'business_name', label: 'Business or organisation name', type: 'text', required: true },
      { name: 'contact_person', label: 'Contact person', type: 'text', required: true },
      { name: 'website_or_social', label: 'Website or social link', type: 'text', placeholder: 'https://' },
      { name: 'what_to_promote', label: 'What would you like to promote?', type: 'radio', required: true,
        options: ['Business', 'Event', 'Offer', 'Service', 'Seasonal campaign', 'Other'] },
      { name: 'advertising_type', label: 'Preferred advertising type', type: 'radio', required: true,
        options: ['Featured directory listing', 'Homepage feature', 'Sponsored article', 'Social promotion', 'Not sure yet'] },
      { name: 'target_timing', label: 'Target timing', type: 'radio',
        options: ['As soon as possible', 'This month', 'Seasonal', 'Specific date'] },
      { name: 'estimated_budget', label: 'Estimated budget', type: 'radio',
        options: ['Under €100', '€100–€250', '€250–€500', '€500+', 'Not sure yet'] },
      { name: 'description', label: 'Short description of what you want advertised', type: 'textarea', required: true, rows: 4 },
      { name: 'anything_else', label: 'Anything else we should know?', type: 'textarea', rows: 3 },
    ],
  },
  {
    id: 'add-business',
    label: 'Add my business to the directory',
    description: 'Get your local business listed on the Crettyard.ie directory.',
    icon: Store,
    color: 'bg-green-50 border-green-200 text-green-700',
    fields: [
      { name: 'business_name', label: 'Business name', type: 'text', required: true },
      { name: 'contact_person', label: 'Contact person', type: 'text', required: true },
      { name: 'address_or_townland', label: 'Business address or townland', type: 'text', required: true },
      { name: 'coverage', label: 'Is the business based in Crettyard or serving the wider area?', type: 'radio', required: true,
        options: ['Based in Crettyard', 'Serves the wider Crettyard area', 'Both'] },
      { name: 'category', label: 'Business category', type: 'select', required: true,
        options: ['Retail', 'Food & hospitality', 'Trades & construction', 'Agriculture', 'Health & wellness',
          'Sport & leisure', 'Childcare & education', 'Professional services', 'Tourism', 'Other'] },
      { name: 'description', label: 'Short business description (30–120 words)', type: 'textarea', required: true, rows: 5,
        hint: 'Tell us what you do and who you serve.' },
      { name: 'website', label: 'Website', type: 'text', placeholder: 'https://' },
      { name: 'facebook', label: 'Facebook page', type: 'text', placeholder: 'https://facebook.com/...' },
      { name: 'instagram', label: 'Instagram', type: 'text', placeholder: '@handle or URL' },
      { name: 'opening_hours', label: 'Opening hours', type: 'text', placeholder: 'e.g. Mon–Fri 9am–5pm' },
      { name: 'public_contact', label: 'Display your phone/email publicly?', type: 'radio', required: true,
        options: ['Yes, show both', 'Phone only', 'Email only', 'Neither'] },
      { name: 'listing_type', label: 'New or update to an existing listing?', type: 'radio', required: true,
        options: ['New listing', 'Update to existing listing', 'Not sure'] },
      { name: 'existing_listing', label: 'Existing listing name or URL (if update)', type: 'text',
        condition: d => d.listing_type === 'Update to existing listing' },
    ],
  },
  {
    id: 'edit-listing',
    label: 'Correct or remove a listing',
    description: 'Request a correction, update or removal of an existing directory entry.',
    icon: Edit3,
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    fields: [
      { name: 'listing_name', label: 'Listing name', type: 'text', required: true },
      { name: 'listing_url', label: 'Listing URL (if known)', type: 'text', placeholder: 'https://crettyard.ie/...' },
      { name: 'action_needed', label: 'What do you need to do?', type: 'radio', required: true,
        options: ['Correct details', 'Update details', 'Mark as closed', 'Remove listing'] },
      { name: 'closed_type', label: 'Is the closure temporary or permanent?', type: 'radio',
        condition: d => d.action_needed === 'Mark as closed',
        options: ['Temporary', 'Permanent'] },
      { name: 'is_owner', label: 'Are you the owner or authorised representative?', type: 'radio', required: true,
        options: ['Yes', 'No'] },
      { name: 'what_is_wrong', label: 'What information is incorrect or needs changing?', type: 'textarea', required: true, rows: 4 },
      { name: 'what_it_should_say', label: 'What should it say instead?', type: 'textarea', rows: 3 },
      { name: 'removal_reason', label: 'Reason for removal', type: 'textarea', rows: 3,
        condition: d => d.action_needed === 'Remove listing' },
      { name: 'evidence_link', label: 'Evidence or reference link', type: 'text' },
    ],
  },
  {
    id: 'share-photos',
    label: 'Share photos',
    description: 'Share historic or present-day photos of Crettyard and the surrounding area.',
    icon: Camera,
    color: 'bg-sky-50 border-sky-200 text-sky-700',
    fields: [
      { name: 'photo_type', label: 'What kind of photos are you sharing?', type: 'radio', required: true,
        options: ['Old / historic', 'Recent village photos', 'Event photos', 'Landscape', 'Business', 'Sports', 'School', 'Other'] },
      { name: 'approximate_date', label: 'Approximate date of the photo(s)', type: 'text',
        placeholder: 'e.g. 1960s, Summer 1985, unknown' },
      { name: 'location_shown', label: 'Location shown in the photo', type: 'text' },
      { name: 'photographer', label: 'Who took the photo?', type: 'text' },
      { name: 'historic_names', label: 'Any names, places or dates shown in the image?', type: 'textarea', rows: 3,
        condition: d => d.photo_type === 'Old / historic',
        hint: 'This helps us caption the image accurately.' },
      { name: 'have_permission', label: 'Do you own or have permission to share this photo?', type: 'radio', required: true,
        options: ['Yes, I own it', 'Yes, I have permission', 'No'] },
      { name: 'publish_permission', label: 'Can we publish it on Crettyard.ie?', type: 'radio', required: true,
        options: ['Yes', 'Yes, with credit', 'Please ask me first'] },
      { name: 'credit_line', label: 'Preferred credit line', type: 'text', placeholder: 'e.g. Photo: Joe Murphy' },
      { name: 'description', label: 'Tell us what the photo shows', type: 'textarea', required: true, rows: 4 },
      { name: 'background_story', label: 'Any background story connected to the image?', type: 'textarea', rows: 3 },
    ],
  },
  {
    id: 'share-story',
    label: 'Share a story or local history',
    description: 'Share a local memory, family history or piece of heritage connected to Crettyard.',
    icon: BookOpen,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    fields: [
      { name: 'author_role', label: 'Are you the author or a family representative?', type: 'radio',
        options: ['Author', 'Family representative', 'Community member', 'Researcher', 'Other'] },
      { name: 'topic', label: 'Topic of your story', type: 'text', required: true },
      { name: 'story_type', label: 'Story type', type: 'radio', required: true,
        options: ['Local memory', 'Family history', 'Mining history', 'School memories', 'Sports history', 'Parish life', 'Business history', 'Other'] },
      { name: 'time_period', label: 'Time period', type: 'text', placeholder: 'e.g. 1940s–1970s, around 1985' },
      { name: 'place', label: 'Place connected to the story', type: 'text' },
      { name: 'story', label: 'Tell us the story', type: 'textarea', required: true, rows: 8,
        hint: 'Write as much or as little as you like — we can help edit for publication.' },
      { name: 'can_edit', label: 'Can we edit for clarity or length before publishing?', type: 'radio', required: true,
        options: ['Yes', 'No — please use as written'] },
      { name: 'name_published', label: 'Can we publish your name?', type: 'radio', required: true,
        options: ['Full name', 'First name only', 'Anonymous'] },
      { name: 'open_to_followup', label: 'Are you open to follow-up questions?', type: 'radio',
        condition: d => ['Mining history', 'Family history'].includes(d.story_type),
        options: ['Yes', 'No'] },
      { name: 'source_notes', label: 'Source notes or references', type: 'textarea', rows: 2,
        hint: 'Any books, documents or people you referenced.' },
    ],
  },
  {
    id: 'text-correction',
    label: 'Suggest a text correction',
    description: 'Spotted a typo, factual error or something outdated on the site? Let us know.',
    icon: FileText,
    color: 'bg-red-50 border-red-200 text-red-700',
    fields: [
      { name: 'page_url', label: 'Which page needs correcting?', type: 'text', required: true,
        placeholder: 'Page title or URL, e.g. /history-heritage' },
      { name: 'amendment_type', label: 'Type of amendment', type: 'radio', required: true,
        options: ['Typo', 'Factual correction', 'Wording improvement', 'Outdated information', 'Missing detail'] },
      { name: 'current_text', label: 'What does it currently say?', type: 'textarea', rows: 3 },
      { name: 'corrected_text', label: 'What should it say instead?', type: 'textarea', required: true, rows: 3 },
      { name: 'why_change', label: 'Why should it be changed?', type: 'textarea', rows: 2 },
      { name: 'source', label: 'Source or evidence', type: 'text',
        placeholder: 'Link, book, document — anything that supports the correction' },
      { name: 'is_urgent', label: 'Is this urgent?', type: 'radio',
        options: ['Yes', 'No'] },
    ],
  },
  {
    id: 'submit-event',
    label: 'Submit an event',
    description: 'Add an upcoming event to the Crettyard community calendar.',
    icon: Calendar,
    color: 'bg-teal-50 border-teal-200 text-teal-700',
    fields: [
      { name: 'event_name', label: 'Event name', type: 'text', required: true },
      { name: 'organiser', label: 'Organiser name', type: 'text', required: true },
      { name: 'event_date', label: 'Event date', type: 'text', required: true, placeholder: 'e.g. Saturday 12 July 2025' },
      { name: 'event_time', label: 'Event time', type: 'text', placeholder: 'e.g. 7:00pm' },
      { name: 'venue', label: 'Venue or location', type: 'text', required: true },
      { name: 'event_category', label: 'Event category', type: 'radio', required: true,
        options: ['Sport', 'School', 'Parish', 'Fundraiser', 'Social', 'Heritage', 'Family', 'Other'] },
      { name: 'description', label: 'Short description', type: 'textarea', required: true, rows: 4 },
      { name: 'booking_link', label: 'Ticket or booking link', type: 'text', placeholder: 'https://' },
      { name: 'is_free', label: 'Is the event free?', type: 'radio',
        options: ['Yes, free', 'No, ticketed', 'Donation welcome'] },
      { name: 'deadline', label: 'Deadline for publishing', type: 'text', placeholder: 'e.g. needs to go live by 1 July' },
    ],
  },
  {
    id: 'general',
    label: 'General enquiry',
    description: 'Any other question, idea or message — we\'d love to hear from you.',
    icon: MessageCircle,
    color: 'bg-slate-50 border-slate-200 text-slate-700',
    fields: [
      { name: 'subject', label: 'Subject', type: 'text', required: true },
      { name: 'message', label: 'Message', type: 'textarea', required: true, rows: 6 },
    ],
  },
];

const SHARED_CONTACT_FIELDS: FieldDef[] = [
  { name: 'name', label: 'Your name', type: 'text', required: true },
  { name: 'email', label: 'Email address', type: 'email', required: true },
  { name: 'phone', label: 'Phone number (optional)', type: 'tel' },
  { name: 'contact_role', label: 'You are contacting as', type: 'radio',
    options: ['Resident', 'Business owner', 'Organisation', 'Visitor', 'Family historian', 'Other'] },
  { name: 'contact_method', label: 'Preferred contact method', type: 'radio',
    options: ['Email', 'Phone'] },
  { name: 'best_time', label: 'Best time to contact (optional)', type: 'text',
    placeholder: 'e.g. mornings, after 6pm' },
];

const FILE_CATEGORIES = ['advertise', 'add-business', 'edit-listing', 'share-photos', 'share-story', 'submit-event'];

// ─── Field renderer ───────────────────────────────────────────────────────────

interface FieldProps {
  field: FieldDef;
  value: string;
  onChange: (name: string, val: string) => void;
  error?: string;
}

const Field: React.FC<FieldProps> = ({ field, value, onChange, error }) => {
  const base =
    'w-full rounded-xl border px-4 py-3 text-sm bg-white text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-on-surface-variant/40';
  const borderClass = error ? 'border-red-400' : 'border-surface-container-high';

  if (field.type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">
          {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {field.hint && <p className="text-xs text-on-surface-variant mb-2">{field.hint}</p>}
        <textarea
          name={field.name}
          value={value}
          onChange={e => onChange(field.name, e.target.value)}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          className={`${base} ${borderClass} resize-y`}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">
          {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          name={field.name}
          value={value}
          onChange={e => onChange(field.name, e.target.value)}
          className={`${base} ${borderClass}`}
        >
          <option value="">Select…</option>
          {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  if (field.type === 'radio') {
    return (
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-2">
          {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="flex flex-wrap gap-2">
          {field.options?.map(o => (
            <button
              key={o}
              type="button"
              onClick={() => onChange(field.name, o)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                value === o
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white border-surface-container-high text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-on-surface mb-1.5">
        {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {field.hint && <p className="text-xs text-on-surface-variant mb-2">{field.hint}</p>}
      <input
        type={field.type}
        name={field.name}
        value={value}
        onChange={e => onChange(field.name, e.target.value)}
        placeholder={field.placeholder}
        className={`${base} ${borderClass}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

// ─── File upload zone ─────────────────────────────────────────────────────────

interface FileUploadProps {
  files: File[];
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
}

const FileUploadZone: React.FC<FileUploadProps> = ({ files, onAdd, onRemove }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handle = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const allowed = Array.from(incoming).filter(f =>
      ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(f.type) && f.size <= 10 * 1024 * 1024
    );
    if (allowed.length) onAdd(allowed);
  }, [onAdd]);

  return (
    <div>
      <label className="block text-sm font-semibold text-on-surface mb-2">
        Upload photos, documents or files <span className="font-normal text-on-surface-variant">(optional)</span>
      </label>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          dragging ? 'border-primary bg-primary/5' : 'border-surface-container-high hover:border-primary/50'
        }`}
      >
        <Upload size={24} className="mx-auto mb-2 text-on-surface-variant" />
        <p className="text-sm text-on-surface-variant">
          Drag files here or <span className="text-primary font-medium">click to browse</span>
        </p>
        <p className="text-xs text-on-surface-variant mt-1">JPG, PNG, PDF up to 10 MB each</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          className="hidden"
          onChange={e => handle(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between bg-surface-container-low rounded-lg px-3 py-2 text-sm">
              <span className="truncate text-on-surface">{f.name}</span>
              <button type="button" onClick={() => onRemove(i)} className="ml-2 text-on-surface-variant hover:text-red-500">
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ─── Progress indicator ───────────────────────────────────────────────────────

const Progress: React.FC<{ step: number; total: number }> = ({ step, total }) => (
  <div className="flex items-center gap-2 mb-8">
    {Array.from({ length: total }).map((_, i) => (
      <React.Fragment key={i}>
        <div className={`h-2 rounded-full transition-all ${
          i < step ? 'bg-primary flex-1' : i === step ? 'bg-primary/30 flex-1' : 'bg-surface-container-high flex-1'
        }`} />
      </React.Fragment>
    ))}
    <span className="text-xs text-on-surface-variant whitespace-nowrap ml-1">Step {step + 1} of {total}</span>
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────

type Step = 'select' | 'details' | 'contact' | 'success';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<Step>('select');
  const [categoryId, setCategoryId] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [submissionId, setSubmissionId] = useState('');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.find(c => c.id === cat)) {
      setCategoryId(cat);
      setStep('details');
    }
  }, [searchParams]);

  const category = CATEGORIES.find(c => c.id === categoryId);
  const showUploads = FILE_CATEGORIES.includes(categoryId);

  const setField = useCallback((name: string, val: string) => {
    setFormData(prev => ({ ...prev, [name]: val }));
    setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  }, []);

  const validate = (fields: FieldDef[], data: Record<string, string>): Record<string, string> => {
    const errs: Record<string, string> = {};
    for (const f of fields) {
      if (f.condition && !f.condition(data)) continue;
      if (f.required && !data[f.name]?.trim()) {
        errs[f.name] = `${f.label} is required`;
      }
    }
    return errs;
  };

  const handleSelectCategory = (id: string) => {
    setCategoryId(id);
    setFormData({});
    setErrors({});
    setStep('details');
  };

  const handleDetailsNext = () => {
    if (!category) return;
    const visible = category.fields.filter(f => !f.condition || f.condition(formData));
    const errs = validate(visible, formData);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep('contact');
  };

  const handleBack = () => {
    if (step === 'details') { setStep('select'); setCategoryId(''); }
    if (step === 'contact') setStep('details');
  };

  const handleSubmit = async () => {
    const errs = validate(SHARED_CONTACT_FIELDS, formData);
    if (!formData.consent) errs.consent = 'You must agree to continue';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setApiError('');
    try {
      const fd = new FormData();
      fd.append('enquiry_type', categoryId);
      for (const [k, v] of Object.entries(formData)) fd.append(k, v);
      for (const f of files) fd.append('file', f, f.name);

      const res = await fetch('/api/contact', { method: 'POST', body: fd });
      const data = await res.json() as { message?: string; error?: string; id?: string };

      if (!res.ok) { setApiError(data.error ?? 'Submission failed. Please try again.'); return; }
      setSubmissionId(data.id ?? '');
      setStep('success');
    } catch {
      setApiError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="signature-gradient text-white py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto pt-12">
          <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-3">Contact & Contribute</p>
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-4">
            Get in touch
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Help us improve Crettyard.ie. Submit a business, share photos or history, suggest a correction, advertise, or send a general enquiry.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <AnimatePresence mode="wait">

          {/* ── Step 1: Category selection ── */}
          {step === 'select' && (
            <motion.div key="select" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">What would you like to enquire about?</h2>
              <p className="text-on-surface-variant text-sm mb-8">Choose your enquiry type and we'll ask only the relevant questions.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      className="group text-left p-5 rounded-2xl border-2 bg-white hover:border-primary hover:shadow-lg transition-all duration-200"
                    >
                      <div className={`inline-flex p-2.5 rounded-xl mb-3 ${cat.color}`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="font-headline font-bold text-on-surface text-base leading-snug mb-1 group-hover:text-primary transition-colors">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{cat.description}</p>
                      <div className="flex items-center gap-1 mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">
                        Continue <ChevronRight size={14} />
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 p-4 bg-surface-container-low rounded-xl text-sm text-on-surface-variant">
                <strong className="text-on-surface">Note:</strong> We review all submissions before publishing to help keep information accurate and useful for the community.
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Category-specific fields ── */}
          {step === 'details' && category && (
            <motion.div key="details" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Progress step={1} total={3} />
              <button type="button" onClick={handleBack} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-6 transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
              <div className="flex items-center gap-3 mb-6">
                <div className={`inline-flex p-2.5 rounded-xl ${category.color}`}>
                  <category.icon size={20} />
                </div>
                <h2 className="font-headline text-2xl font-bold text-on-surface">{category.label}</h2>
              </div>
              <div className="space-y-6">
                {category.fields.map(f => {
                  if (f.condition && !f.condition(formData)) return null;
                  return <Field key={f.name} field={f} value={formData[f.name] ?? ''} onChange={setField} error={errors[f.name]} />;
                })}
                {showUploads && (
                  <FileUploadZone
                    files={files}
                    onAdd={newFiles => setFiles(prev => [...prev, ...newFiles])}
                    onRemove={i => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                  />
                )}
              </div>
              <div className="mt-8 flex justify-end">
                <button type="button" onClick={handleDetailsNext} className="flex items-center gap-2 px-8 py-3 rounded-full signature-gradient text-white font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Contact details + consent ── */}
          {step === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Progress step={2} total={3} />
              <button type="button" onClick={handleBack} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-6 transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">Your contact details</h2>
              <p className="text-on-surface-variant text-sm mb-8">We'll only use this to follow up on your submission.</p>
              <div className="space-y-6">
                {SHARED_CONTACT_FIELDS.map(f => (
                  <Field key={f.name} field={f} value={formData[f.name] ?? ''} onChange={setField} error={errors[f.name]} />
                ))}

                {/* Honeypot */}
                <input type="text" name="website_url_do_not_fill" tabIndex={-1} autoComplete="off" className="hidden" />

                {/* Consent */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => { setField('consent', formData.consent ? '' : 'yes'); }}
                      className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        formData.consent ? 'bg-primary border-primary' : 'border-surface-container-high group-hover:border-primary'
                      }`}
                    >
                      {formData.consent && <CheckCircle size={12} className="text-white" />}
                    </div>
                    <span className="text-sm text-on-surface leading-relaxed">
                      I understand my submission may be reviewed by the Crettyard.ie team before it is published, and I consent to the information being used for the stated purpose. <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.consent && <p className="text-xs text-red-500 mt-2 ml-8">{errors.consent}</p>}
                </div>

                {apiError && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    {apiError}
                  </div>
                )}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 px-8 py-3 rounded-full signature-gradient text-white font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-primary/20 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send message <ChevronRight size={16} /></>}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Success ── */}
          {step === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <CheckCircle size={40} className="text-primary" />
              </div>
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-3">Message sent!</h2>
              <p className="text-on-surface-variant max-w-md mx-auto mb-2">
                Thank you for getting in touch. We've received your{' '}
                <strong>{CATEGORIES.find(c => c.id === categoryId)?.label.toLowerCase()}</strong> and will be in touch shortly.
              </p>
              {submissionId && (
                <p className="text-xs text-on-surface-variant mb-8">Reference: <code className="font-mono">{submissionId.slice(0, 8).toUpperCase()}</code></p>
              )}
              <button
                type="button"
                onClick={() => { setStep('select'); setCategoryId(''); setFormData({}); setFiles([]); setErrors({}); }}
                className="px-8 py-3 rounded-full signature-gradient text-white font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-primary/20"
              >
                Submit another enquiry
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
