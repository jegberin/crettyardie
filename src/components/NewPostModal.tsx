import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Paperclip, Loader2, CheckCircle, AlertCircle, FileText, Image } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Post {
  id: string;
  username: string;
  title: string;
  body: string;
  created_at: string;
  attachments: Attachment[];
}

interface Attachment {
  id: string;
  filename: string;
  content_type: string;
  size: number;
  storage_key: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (post: Post) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']);
const ALLOWED_LABEL = 'JPG, PNG, WebP, GIF or PDF';

export default function NewPostModal({ isOpen, onClose, onCreated }: Props) {
  const { authHeader } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function reset() {
    setTitle(''); setBody(''); setFile(null); setToast(null);
  }

  function handleClose() {
    reset(); onClose();
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!ALLOWED_TYPES.has(f.type)) {
      setToast({ type: 'error', msg: `Only ${ALLOWED_LABEL} files are allowed` });
      if (fileRef.current) fileRef.current.value = '';
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setToast({ type: 'error', msg: 'File must be under 5 MB' });
      if (fileRef.current) fileRef.current.value = '';
      return;
    }
    setFile(f);
    setToast(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setToast({ type: 'error', msg: 'Title and body are required' });
      return;
    }
    setLoading(true);
    setToast(null);
    try {
      const fd = new FormData();
      fd.append('title', title.trim());
      fd.append('body', body.trim());
      if (file) fd.append('file', file);

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { ...authHeader() },
        body: fd,
      });
      const data = await res.json() as Post & { error?: string };
      if (res.ok) {
        onCreated(data);
        handleClose();
      } else {
        setToast({ type: 'error', msg: data.error ?? 'Failed to create post' });
      }
    } catch {
      setToast({ type: 'error', msg: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface text-sm transition-all';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="px-8 pt-8 pb-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-headline text-2xl font-extrabold tracking-tighter text-primary">New Announcement</h2>
                  <p className="text-on-surface-variant text-sm mt-1">Share news or information with the community</p>
                </div>
                <button onClick={handleClose} className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
                  <X size={20} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {toast && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={`mx-8 mb-4 px-4 py-3 rounded-xl flex items-start gap-3 text-sm ${toast.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {toast.type === 'success' ? <CheckCircle size={16} className="mt-0.5 shrink-0" /> : <AlertCircle size={16} className="mt-0.5 shrink-0" />}
                  {toast.msg}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1.5">Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputCls}
                  placeholder="e.g. Community meeting this Saturday" required maxLength={200} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1.5">Details</label>
                <textarea value={body} onChange={e => setBody(e.target.value)} className={`${inputCls} resize-none`}
                  rows={5} placeholder="Write your announcement here..." required maxLength={5000} />
                <p className="text-xs text-on-surface-variant mt-1 text-right">{body.length}/5000</p>
              </div>

              {/* File attachment */}
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1.5">
                  Attachment <span className="normal-case font-normal">(optional · JPG, PNG, WebP, GIF or PDF · max 5 MB)</span>
                </label>
                {file ? (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/20 bg-primary/5">
                    {file.type.startsWith('image/') ? <Image size={18} className="text-primary shrink-0" /> : <FileText size={18} className="text-primary shrink-0" />}
                    <span className="text-sm text-on-surface truncate flex-1">{file.name}</span>
                    <button type="button" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ''; }}
                      className="text-on-surface-variant hover:text-on-surface transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-outline-variant/40 hover:border-primary/40 hover:bg-primary/5 transition-all w-full text-on-surface-variant text-sm">
                    <Paperclip size={16} />
                    Click to attach a file
                  </button>
                )}
                <input ref={fileRef} type="file" className="hidden" onChange={handleFile}
                  accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,.jpg,.jpeg,.png,.webp,.gif,.pdf" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading && <Loader2 size={16} className="animate-spin" />}
                Publish Announcement
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
