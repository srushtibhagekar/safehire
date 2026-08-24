import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const AdminRoute: React.FC = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100">Access Restricted</h2>
        <p className="text-slate-400 max-w-md mt-2 mb-6">
          Administrator privileges are required to access this console. Please sign in with an authorized security admin account.
        </p>
        <a
          href="/dashboard"
          className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition"
        >
          Return to User Dashboard
        </a>
      </div>
    );
  }

  return <Outlet />;
};
