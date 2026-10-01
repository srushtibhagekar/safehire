import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { AdminUserItem } from '../../types/admin';
import {
  Users,
  Search,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
  Calendar,
  Activity,
  Terminal,
} from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await adminService.getUsers();
      if (res.success && res.data) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId: string) => {
    try {
      const res = await adminService.toggleUserStatus(userId);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
        );
      }
    } catch (err) {
      console.error('Status toggle failed:', err);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>User Access Control & IAM</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-100">
          User Account Directory
        </h1>
        <p className="text-xs text-slate-400">
          Manage analyst accounts, authentication status, and forensic scan quotas.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or email..."
          className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#0D121D] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-[#0D121D] border border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 text-center space-y-2 font-mono">
            <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading user accounts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-2 font-sans">
            <Users className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-200 font-mono">No Users Found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#080B11] border-b border-slate-800 font-mono text-[11px] text-slate-400 uppercase">
                <tr>
                  <th className="px-5 py-3">Analyst Identity</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Scans Run</th>
                  <th className="px-4 py-3">Registered</th>
                  <th className="px-4 py-3 text-right">Access Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 font-mono">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-[#111726]/60 transition-colors">
                    <td className="px-5 py-3.5 font-sans">
                      <div className="font-bold text-slate-100">{u.name}</div>
                      <div className="text-[11px] font-mono text-slate-400">{u.email}</div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                          u.role === 'ADMIN'
                            ? 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                            : 'text-sky-400 bg-sky-500/10 border-sky-500/20'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-mono ${
                          u.isActive ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            u.isActive ? 'bg-emerald-400' : 'bg-rose-400'
                          }`}
                        />
                        {u.isActive ? 'Active' : 'Suspended'}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-slate-300">
                      {u.scanCount || 0} scans
                    </td>

                    <td className="px-4 py-3.5 text-[11px] text-slate-400 whitespace-nowrap">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition ${
                          u.isActive
                            ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
                        }`}
                      >
                        {u.isActive ? 'Suspend' : 'Activate'}
                      </button>
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
