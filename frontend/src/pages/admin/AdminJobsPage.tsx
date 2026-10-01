import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import {
  FileText,
  Search,
  Building2,
  Calendar,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';

export const AdminJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await adminService.getJobs();
      if (res.success && res.data) {
        setJobs(res.data);
      }
    } catch (err) {
      console.error('Failed to load jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filtered = jobs.filter(
    (j) =>
      (j.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (j.companyName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Ingested Job Posts Repository</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-100">
          Job Postings Registry
        </h1>
        <p className="text-xs text-slate-400">
          Global database of ingested recruitment positions, compensation claims, and hiring contacts.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ingested job listings by title or employer..."
          className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#0D121D] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#0D121D] border border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 text-center space-y-2 font-mono">
            <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading ingested jobs...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-2 font-sans">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-200 font-mono">No Postings Found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#080B11] border-b border-slate-800 font-mono text-[11px] text-slate-400 uppercase">
                <tr>
                  <th className="px-5 py-3">Job Title & Employer</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Compensation</th>
                  <th className="px-4 py-3">Recruiter Channel</th>
                  <th className="px-4 py-3">Ingested At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filtered.map((j) => (
                  <tr key={j.id || j._id} className="hover:bg-[#111726]/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-slate-100">{j.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        <span>{j.companyName}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-slate-300 font-mono text-[11px]">
                      {j.location || 'Unspecified'}
                    </td>

                    <td className="px-4 py-3.5 font-mono text-sky-400 text-[11px]">
                      {j.salary || '—'}
                    </td>

                    <td className="px-4 py-3.5 text-slate-400 font-mono text-[11px] truncate max-w-xs">
                      {j.contactEmail || j.recruiterContact || '—'}
                    </td>

                    <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {j.createdAt ? new Date(j.createdAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
