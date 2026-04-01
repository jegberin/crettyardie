import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Tab = 'login' | 'register' | 'forgot';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: Tab;
  verifyToken?: string;
  resetToken?: string;
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login', verifyToken, resetToken }: Props) {
  const { login } = useAuth();
  const [tab, setTab] = useState<Tab>(resetToken ? 'login' : initialTab);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', newPassword: '' });

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  useEffect(() => {
    if (!isOpen) return;
    setToast(null);
    setForm({ username: '', email: '', password: '', confirmPassword: '', newPassword: '' });
  }, [isOpen, tab]);

  // Handle email verification token from URL
  useEffect(() => {
    if (!verifyToken || !isOpen) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/auth/verify?token=${verifyToken}`);
        const data = await res.json() as { message?: string; error?: string };
        if (res.ok) {
          setToast({ type: 'success', msg: data.message ?? 'Email verified! You can now log in.' });
          setTab('login');
        } else {
          setToast({ type: 'error', msg: data.error ?? 'Verification failed' });
        }
      } catch {
        setToast({ type: 'error', msg: 'Verification failed. Please try again.' });
      } finally {
        setLoading(false);
      }
    })();
  }, [verifyToken, isOpen]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setToast({ type: 'error', msg: 'Passwords do not match' });
      return;
    }
    setLoading(true);
    setToast(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, email: form.email, password: form.password }),
      });
      const data = await res.json() as { message?: string; error?: string };
      if (res.ok) {
        setToast({ type: 'success', msg: data.message ?? 'Registered! Check your email.' });
        setForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
      } else {
        setToast({ type: 'error', msg: data.error ?? 'Registration failed' });
      }
    } catch {
      setToast({ type: 'error', msg: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json() as { token?: string; username?: string; email?: string; error?: string };
      if (res.ok && data.token && data.username && data.email) {
        login({ token: data.token, username: data.username, email: data.email });
        onClose();
      } else {
        setToast({ type: 'error', msg: data.error ?? 'Login failed' });
      }
    } catch {
      setToast({ type: 'error', msg: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json() as { message?: string; error?: string };
      setToast({ type: res.ok ? 'success' : 'error', msg: data.message ?? data.error ?? 'Request failed' });
    } catch {
      setToast({ type: 'error', msg: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!resetToken) return;
    setLoading(true);
    setToast(null);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, password: form.newPassword }),
      });
      const data = await res.json() as { message?: string; error?: string };
      if (res.ok) {
        setToast({ type: 'success', msg: data.message ?? 'Password reset! You can now log in.' });
      } else {
        setToast({ type: 'error', msg: data.error ?? 'Reset failed' });
      }
    } catch {
      setToast({ type: 'error', msg: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface text-sm transition-all';
  const labelCls = 'block text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1.5';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-0">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-headline text-2xl font-extrabold tracking-tighter text-primary">
                    {resetToken ? 'Set New Password' : tab === 'login' ? 'Welcome back' : tab === 'register' ? 'Join Crettyard.ie' : 'Reset Password'}
                  </h2>
                  <p className="text-on-surface-variant text-sm mt-1">
                    {resetToken ? 'Choose a new password for your account' : tab === 'login' ? 'Log in to post on the notice board' : tab === 'register' ? 'Create an account to share announcements' : 'Enter your email and we\'ll send a reset link'}
                  </p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              {!resetToken && (
                <div className="flex gap-1 bg-surface-container rounded-full p-1 mb-6">
                  {(['login', 'register'] as Tab[]).map(t => (
                    <button key={t} onClick={() => setTab(t)}
                      className={`flex-1 py-2 px-4 rounded-full text-sm font-bold transition-all ${tab === t ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
                      {t === 'login' ? 'Log In' : 'Register'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Toast */}
            <AnimatePresence>
              {toast && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={`mx-8 mb-4 px-4 py-3 rounded-xl flex items-start gap-3 text-sm ${toast.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {toast.type === 'success' ? <CheckCircle size={16} className="mt-0.5 shrink-0" /> : <AlertCircle size={16} className="mt-0.5 shrink-0" />}
                  {toast.msg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Forms */}
            <div className="px-8 pb-8">
              {/* Reset password (via link) */}
              {resetToken && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className={labelCls}>New Password</label>
                    <div className="relative">
                      <input type={showPwd ? 'text' : 'password'} value={form.newPassword} onChange={set('newPassword')}
                        className={inputCls} placeholder="Min. 8 characters" required minLength={8} />
                      <button type="button" onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-3 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    Set New Password
                  </button>
                </form>
              )}

              {/* Login */}
              {!resetToken && tab === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className={labelCls}>Email</label>
                    <input type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="your@email.com" required />
                  </div>
                  <div>
                    <label className={labelCls}>Password</label>
                    <div className="relative">
                      <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={set('password')}
                        className={inputCls} placeholder="Your password" required />
                      <button type="button" onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <button type="button" onClick={() => setTab('forgot')} className="text-primary text-xs font-semibold hover:underline">
                    Forgot your password?
                  </button>
                  <button type="submit" disabled={loading}
                    className="w-full py-3 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    Log In
                  </button>
                </form>
              )}

              {/* Register */}
              {!resetToken && tab === 'register' && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className={labelCls}>Username</label>
                    <input type="text" value={form.username} onChange={set('username')} className={inputCls} placeholder="e.g. john_doe" required />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="your@email.com" required />
                  </div>
                  <div>
                    <label className={labelCls}>Password</label>
                    <div className="relative">
                      <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={set('password')}
                        className={inputCls} placeholder="Min. 8 characters" required minLength={8} />
                      <button type="button" onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Confirm Password</label>
                    <input type="password" value={form.confirmPassword} onChange={set('confirmPassword')} className={inputCls} placeholder="Repeat password" required />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-3 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    Create Account
                  </button>
                </form>
              )}

              {/* Forgot password */}
              {!resetToken && tab === 'forgot' && (
                <form onSubmit={handleForgot} className="space-y-4">
                  <div>
                    <label className={labelCls}>Email</label>
                    <input type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="your@email.com" required />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-3 rounded-full signature-gradient text-on-primary font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    Send Reset Link
                  </button>
                  <button type="button" onClick={() => setTab('login')} className="w-full text-on-surface-variant text-sm hover:text-on-surface transition-colors">
                    ← Back to Log In
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
