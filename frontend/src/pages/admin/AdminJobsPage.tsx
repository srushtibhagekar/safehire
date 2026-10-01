import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Search } from 'lucide-react';

export const AdminJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
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
    fetchJobs();
  }, []);

  const filtered = jobs.filter(
    (j) =>
      (j.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (j.companyName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans text-foreground">
      
      {/* Header */}
      <div className="pb-4 border-b border-border space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Ingested Job Postings
        </h1>
        <p className="text-xs text-text-secondary">
          Database of all analyzed job listings across the platform.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search postings by title or company..."
          className="w-full pl-8 pr-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg bg-surface border border-border overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-xs text-text-muted font-mono">
            Loading job postings...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-text-muted">
            No job postings found.
          </div>
        ) : (
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-surface-subtle border-b border-border font-mono text-[11px] text-text-muted uppercase">
              <tr>
                <th className="px-4 py-2.5">Title & Company</th>
                <th className="px-3 py-2.5">Location</th>
                <th className="px-3 py-2.5">Salary</th>
                <th className="px-3 py-2.5">Contact Channel</th>
                <th className="px-4 py-2.5">Ingested</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((j) => (
                <tr key={j.id || j._id} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-foreground">{j.title}</div>
                    <div className="text-[11px] text-text-muted font-mono">{j.companyName}</div>
                  </td>

                  <td className="px-3 py-3 text-text-secondary">
                    {j.location || '—'}
                  </td>

                  <td className="px-3 py-3 font-mono text-foreground font-medium">
                    {j.salary || '—'}
                  </td>

                  <td className="px-3 py-3 font-mono text-text-secondary truncate max-w-xs">
                    {j.contactEmail || j.recruiterContact || '—'}
                  </td>

                  <td className="px-4 py-3 font-mono text-text-muted text-[11px] whitespace-nowrap">
                    {j.createdAt ? new Date(j.createdAt).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};
