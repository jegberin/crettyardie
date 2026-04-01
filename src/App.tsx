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

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history-heritage" element={<HistoryPage />} />
        <Route path="/businesses" element={<BusinessesPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
