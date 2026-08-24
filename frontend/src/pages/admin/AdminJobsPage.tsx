import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import {
  FileText,
  Building,
  Calendar,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';

export const AdminJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await adminService.getJobs({ page, limit: 15 });
      if (res.success) {
        setJobs(res.data || []);
        setTotalPages(res.meta.totalPages || 1);
      }
    } catch (err) {
      console.error('Fetch admin jobs error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Admin Console
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-purple-400" />
            Global Job Audit Log
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            System-wide audit trail of all job advertisements scanned by users and guests.
          </p>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">Loading audit records...</div>
      ) : jobs.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
          No job post analyses recorded in the system.
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Job Title & Company</th>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Risk Score</th>
                  <th className="py-3.5 px-4">Classification</th>
                  <th className="py-3.5 px-4">Scanned Date</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {jobs.map((item) => {
                  const job = item.jobPostId || {};
                  const user = item.userId;
                  const isScam = item.classification === 'LIKELY_FRAUDULENT';
                  const isCaution = item.classification === 'NEEDS_CAUTION';

                  return (
                    <tr key={item._id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-200 block truncate max-w-xs">{job.title || 'Untitled Post'}</span>
                        <span className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Building className="w-3 h-3 text-cyan-400" />
                          {job.companyName || 'Unknown Company'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {user ? (
                          <div>
                            <span className="block font-semibold">{user.name}</span>
                            <span className="text-[10px] text-slate-500">{user.email}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500 font-mono text-[11px]">Guest Session</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold">
                        <span
                          className={`text-xs ${
                            isScam ? 'text-red-400' : isCaution ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          {item.riskScore}/100
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            isScam
                              ? 'bg-red-500/10 text-red-400 border-red-500/30'
                              : isCaution
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          }`}
                        >
                          {item.classification}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/results/${item._id}`}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold inline-flex items-center gap-1"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-xs text-slate-400">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
};
