import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import {
  PenLine, User, Clock, Paperclip, Trash2, LogIn, LogOut,
  MessageSquare, FileText, Image as ImageIcon, AlertCircle, Loader2,
  ChevronDown, ChevronUp,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import NewPostModal from '../components/NewPostModal';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Attachment {
  id: string;
  filename: string;
  content_type: string;
  size: number;
  storage_key: string;
}

interface Post {
  id: string;
  user_id: string;
  username: string;
  title: string;
  body: string;
  created_at: string;
  attachments: Attachment[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso + (iso.endsWith('Z') ? '' : 'Z'));
  return d.toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(iso: string): string {
  const d = new Date(iso + (iso.endsWith('Z') ? '' : 'Z'));
  return d.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' });
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AttachmentChip({ a }: { a: Attachment }) {
  const isImage = a.content_type.startsWith('image/');
  return (
    <a
      href={`/api/uploads/${a.storage_key}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 hover:bg-primary/15 border border-primary/15 text-primary text-xs font-medium transition-colors"
    >
      {isImage ? <ImageIcon size={12} /> : <FileText size={12} />}
      <span className="truncate max-w-[160px]">{a.filename}</span>
      <span className="text-on-surface-variant">({formatBytes(a.size)})</span>
    </a>
  );
}

function PostCard({ post, currentUsername, onDelete }: { post: Post; currentUsername?: string; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const { authHeader } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const isOwner = !!currentUsername && currentUsername === post.username;
  const SNIPPET_LENGTH = 280;
  const isLong = post.body.length > SNIPPET_LENGTH;

  async function handleDelete() {
    if (!confirm('Delete this post?')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${post.id}`, { method: 'DELETE', headers: authHeader() });
      if (res.ok) onDelete(post.id);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 p-6 md:p-8 hover:shadow-xl hover:shadow-primary/5 transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="font-headline text-xl font-extrabold tracking-tight text-on-surface leading-tight">{post.title}</h3>
        {isOwner && (
          <button onClick={handleDelete} disabled={deleting}
            className="p-2 rounded-full hover:bg-red-50 text-on-surface-variant hover:text-red-600 transition-colors shrink-0 disabled:opacity-50">
            {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
          </button>
        )}
      </div>

      <div className="text-on-surface text-sm leading-relaxed whitespace-pre-wrap">
        {isLong && !expanded ? post.body.slice(0, SNIPPET_LENGTH) + '…' : post.body}
      </div>
      {isLong && (
        <button onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center gap-1 text-primary text-xs font-semibold hover:underline">
          {expanded ? <><ChevronUp size={14} /> Show less</> : <><ChevronDown size={14} /> Read more</>}
        </button>
      )}

      {post.attachments.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.attachments.map(a => <AttachmentChip key={a.id} a={a} />)}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-outline-variant/10 flex items-center gap-4 text-xs text-on-surface-variant">
        <span className="flex items-center gap-1.5"><User size={12} />{post.username}</span>
        <span className="flex items-center gap-1.5"><Clock size={12} />{formatDate(post.created_at)} · {formatTime(post.created_at)}</span>
        {post.attachments.length > 0 && (
          <span className="flex items-center gap-1.5"><Paperclip size={12} />{post.attachments.length}</span>
        )}
      </div>
    </motion.article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NoticeboardPage() {
  const { user, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const verifyToken = searchParams.get('verify_token') ?? undefined;
  const resetToken = searchParams.get('reset_token') ?? undefined;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [authOpen, setAuthOpen] = useState(!!(verifyToken || resetToken));
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [newPostOpen, setNewPostOpen] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json() as Post[];
      setPosts(data);
    } catch {
      setError('Could not load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  function handlePostCreated(post: Post) {
    setPosts(prev => [post, ...prev]);
  }

  function handlePostDeleted(id: string) {
    setPosts(prev => prev.filter(p => p.id !== id));
  }

  function openAuth(tab: 'login' | 'register') {
    setAuthTab(tab);
    setAuthOpen(true);
  }

  function handleAuthClose() {
    setAuthOpen(false);
    if (verifyToken || resetToken) {
      setSearchParams({});
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-surface-container to-transparent overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <MessageSquare size={22} />
            </div>
            <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs">Community</p>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter mb-4">
            Notice Board
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
            Community announcements, local news and updates from Crettyard and the surrounding area. Anyone can read; log in to post.
          </p>

          {/* Auth status bar */}
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            {user ? (
              <>
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  Logged in as <span className="font-bold">@{user.username}</span>
                </span>
                <button onClick={() => setNewPostOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                  <PenLine size={15} />
                  New Post
                </button>
                <button onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant hover:text-on-surface text-sm transition-colors">
                  <LogOut size={14} />
                  Log out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => openAuth('login')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-outline-variant/30 hover:border-primary/30 text-on-surface-variant hover:text-primary text-sm font-semibold transition-all">
                  <LogIn size={15} />
                  Log In to Post
                </button>
                <button onClick={() => openAuth('register')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                  Create Account
                </button>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* Posts */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-on-surface-variant">
              <Loader2 size={32} className="animate-spin text-primary" />
              <p>Loading announcements…</p>
            </div>
          )}

          {error && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-3 px-6 py-5 rounded-2xl bg-red-50 border border-red-200 text-red-800">
              <AlertCircle size={20} className="shrink-0" />
              <div>
                <p className="font-semibold">{error}</p>
                <button onClick={loadPosts} className="text-sm underline mt-1">Try again</button>
              </div>
            </motion.div>
          )}

          {!loading && !error && posts.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-24">
              <div className="w-16 h-16 rounded-3xl bg-surface-container mx-auto mb-6 flex items-center justify-center">
                <MessageSquare size={28} className="text-on-surface-variant" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">No announcements yet</h3>
              <p className="text-on-surface-variant text-sm">Be the first to post something for the community!</p>
              {!user && (
                <button onClick={() => openAuth('register')}
                  className="mt-6 px-6 py-3 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                  Get started
                </button>
              )}
            </motion.div>
          )}

          {!loading && !error && posts.length > 0 && (
            <AnimatePresence>
              <div className="space-y-6">
                {posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUsername={user?.username}
                    onDelete={handlePostDeleted}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Floating action button (mobile) */}
      {user && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setNewPostOpen(true)}
          className="fixed bottom-8 right-6 md:hidden w-14 h-14 rounded-full signature-gradient text-on-primary shadow-2xl shadow-primary/30 flex items-center justify-center z-50"
        >
          <PenLine size={22} />
        </motion.button>
      )}

      {/* Modals */}
      <AuthModal
        isOpen={authOpen}
        onClose={handleAuthClose}
        initialTab={authTab}
        verifyToken={verifyToken}
        resetToken={resetToken}
      />
      <NewPostModal
        isOpen={newPostOpen}
        onClose={() => setNewPostOpen(false)}
        onCreated={handlePostCreated}
      />
    </main>
  );
}
