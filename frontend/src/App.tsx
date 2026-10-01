import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AdminRoute } from './components/common/AdminRoute';
import { CommandPalette } from './components/common/CommandPalette';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AnalyzePage } from './pages/AnalyzePage';
import { ResultPage } from './pages/ResultPage';
import { ReportViewPage } from './pages/ReportViewPage';
import { CompanyVerificationPage } from './pages/CompanyVerificationPage';

// Protected User Pages
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { SavedPage } from './pages/SavedPage';
import { ProfilePage } from './pages/ProfilePage';

// Protected Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminJobsPage } from './pages/admin/AdminJobsPage';
import { AdminModelPage } from './pages/admin/AdminModelPage';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Global Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette />

      <Navbar />
      
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/companies" element={<CompanyVerificationPage />} />
          <Route path="/company-verify" element={<CompanyVerificationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/results/:id" element={<ResultPage />} />
          <Route path="/reports/:id" element={<ReportViewPage />} />

          {/* Authenticated User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/job-posts" element={<AdminJobsPage />} />
            <Route path="/admin/model" element={<AdminModelPage />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
