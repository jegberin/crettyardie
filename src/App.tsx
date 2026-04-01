/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import BusinessesPage from './pages/BusinessesPage';
import CommunityPage from './pages/CommunityPage';
import NoticeboardPage from './pages/NoticeboardPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import TermsPage from './pages/TermsPage';
import { CookieBanner } from './components/CookieBanner';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen selection:bg-primary-container selection:text-on-primary-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history-heritage" element={<HistoryPage />} />
          <Route path="/businesses" element={<BusinessesPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/noticeboard" element={<NoticeboardPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
        <Footer />
        <CookieBanner />
        <GoogleAnalytics />
      </div>
    </AuthProvider>
  );
}
